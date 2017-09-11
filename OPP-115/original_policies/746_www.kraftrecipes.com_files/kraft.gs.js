/* ==========================================================================
   Grocery Server JS
   ========================================================================== */

var kraft = kraft || {};

kraft.gs = {

    statusCodeSuccess: "SUCCESS",
    statusCodeFailure: "FAILURE",
    lastResponse: {},

    storeGrocerServerSession: function (data) {
        if (typeof data.sessionId === "undefined") {
            console.log("ERROR getting session ID established from GS");
            return;
        }
        console.log("GS session ID: " + data.sessionId);
        kraft.utilities.createCookie("GroceryServerSessionId", data.sessionId);
    },

    createGroceryServerSession: function () {
        var sessionId = kraft.utilities.readCookie("GroceryServerSessionId");
        if (sessionId) {
            console.log("GS session ID found: " + sessionId);
        } else {
            jsonp.call(window.gsSessionServiceUrl, kraft.gs.storeGrocerServerSession);
        }
    },

    login: function () {
        var gsSessionId = kraft.utilities.readCookie("GS_userSessionToken");
        var alreadyLoggedIntoGroceryServer = kraft.utilities.readCookie("GSLoggedIn");
        if (gsSessionId && alreadyLoggedIntoGroceryServer) {
            console.log("Grocery Server Session Found");
            return;
        }
        var sweetSessionId = kraft.utilities.readCookie("SweetSessionId");
        console.log("sweet session id: " + sweetSessionId);
        var siteUserId = kraft.utilities.readCookie("SiteUserId");
        console.log("site user id: " + siteUserId);

        var partnerLoginRequest = {
            partnerName: "kraft",
            userId: siteUserId,
            session: sweetSessionId
        };

        gsapi.session.partnerLogin(partnerLoginRequest, function(r) {
            console.log(r); 
            if (r.status && r.status.code && r.status.code === kraft.gs.statusCodeSuccess) {
                kraft.utilities.createCookie("GSLoggedIn", true);
            }
        });
    },

    normalizeIngredient: function (ingredient) {

        var quantity = ingredient.quantity ? ingredient.quantity.toString().replace("-", " ") : "";
        var ing = {
            "id": ingredient.id,
            "shoppingListItemId": ingredient.shoppingListItemId,
            "quantity": ingredient.quantity,
            "counter": ingredient.counter,
            "measure": ingredient.unit,
            "title": ingredient.displayLabel,
            "promotionsCount": 0,
            "ingType": 1,
            "recipeId": ingredient.recipe_id,
            "originalPrice": Number.MAX_VALUE,
            "totalSavings": 0,
            "ingImageUrl": ingredient.ingImageUrl,
            "checked": false,
            "totalQuantity": Ratio.parse(quantity).multiply(ingredient.counter).simplify().toLocaleString(),
            "expand": false
        };

        if (ingredient.specials) {
            ing = this.addPromotionsData(ingredient, ing);
        }

        return ing;
    },

    recipeBox: {
        add: function (recipeId, callback) {
            console.log("adding recipe with ID " + recipeId + " to recipe box");
            var params = [recipeId];
            RECIPE.addFavoriteRecipes(recipeId, function (r) {
                console.log(r);
                if (r.status.code === kraft.gs.statusCodeSuccess) {
                    callback();
                }
            });

            return true;
        },
        addByExternalId: function (recipeId, sourceId, callback) {
            console.log("getting the recipe from GS using the SWEET ID");
            var params = { externalId: recipeId, sourceId: sourceId, url:null };
            console.log(params);
            var groceryServerRecipeId = 0;
            RECIPE.getRecipeByExternalId(params, function (r) {
                console.log(r);
                kraft.gs.lastResponse = r;
                if (r && r.status && r.status.code === kraft.gs.statusCodeSuccess) {
                    //TODO: Decide what to do if we get too many results (should never happen if we have the sourceId set)
                    if (r.totalCount === 1) { //this is basically a sanity check, there should alway only be one if we've gotten this far)
                        var id = r.recipes[0].id;
                        kraft.gs.recipeBox.add(id, callback);
                    }
                }
            });
        },
        remove: function (recipeId, callback) {
            console.log("Removing recipe from recipe box with id: " + recipeId);
            RECIPE.removeFavorite(recipeId, function (r) {
                console.log(r);
                if (r.status.code === kraft.gs.statusCodeSuccess) {
                    callback();
                }
            });

            return true;
        },
        removeByExternalId: function (recipeId, sourceId, callback) {
            console.log("getting the recipe from GS using the SWEET ID");
            var params = { externalId: recipeId, sourceId: sourceId, url: null };
            console.log(params);
            var groceryServerRecipeId = 0;
            RECIPE.getRecipeByExternalId(params, function (r) {
                console.log(r);
                kraft.gs.lastResponse = r;
                if (r && r.status && r.status.code === kraft.gs.statusCodeSuccess) {
                    //TODO: Decide what to do if we get too many results (should never happen if we have the sourceId set)
                    if (r.totalCount === 1) { //this is basically a sanity check, there should alway only be one if we've gotten this far)
                        var id = r.recipes[0].id;
                        kraft.gs.recipeBox.remove(id, callback);
                    }
                }
            });
        },
        checkExisting: function () {

        }
    },

    dealsStore: {
        getCityState: function(callback) {
            var zipCode = kraft.utilities.readCookie('kraft_sessionZip');
            LOCATION.getLocationByZip(zipCode, function (data) {
                var city = data.location.city.charAt(0).toUpperCase() + data.location.city.slice(1).toLowerCase();
                callback(city, data.location.state);
            });
        },
        setLocationPreferences: function(storeIDs) {
            var params = {
                "zipCode": kraft.utilities.readCookie('kraft_sessionZip'),
                "stores": storeIDs.join('|')
            };
            USER.setUserProfile(params, function(r) {
                if (r.code === kraft.gs.statusCodeFailure) {
                    console.log('setting user zip code failed');
                    return;
                }

                console.log('setting user zip code successful');
            });
            return true;
        },
        getStoresByDistance: function(zipCode, distance, callback) {
            var params = {
                "zipCode": zipCode,
                //"rollupBy":"id",
                //"includeNearestStore":"true",
                "radius": distance
            };
            SEARCH.getChainsByZip(params, function(r) {
                if (r.responseCode.code === kraft.gs.statusCodeFailure) {
                    callback(null, r.responseCode.message);
                    return;
                }
                callback(r);
            });
            return true;
        },
        getStoresByItem: function(zipCode, tagsArray, maxResults, callback) {
            var params = {
                'searchTerms': tagsArray,
                'zipCode': zipCode,
                'types':['coupon','special','electronic'],
                'offset': '0',
                'maxResult': maxResults
            };

            SEARCH.getPromotionsForSearchTerms(params, function(r) {
                if (r.totalCount === 0 && r.categories.length === 0) {
                    callback(undefined);
                    return;
                }
                callback(r);
            });
            return true;
        },
        getUserStores: function(callback) {
            var params = {};
            USER.getUserProfile(function (r) {
                if (r.status.code === kraft.gs.statusCodeFailure) {
                    console.log('user not logged in to GS in order to get their stores');
                    callback([]);
                    return;
                }

                var storeIDs = !r.chainIdList ? [] : r.chainIdList;

                if (r.preferredStore) {
                    storeIDs = storeIDs.push(r.preferredStore);
                }

                callback(storeIDs);
            });
            return true;
        },
        getCategoriesByStore: function(zipcode, storeID, callback) {
            var params = {
                "zipCode": zipcode,
                "chainIdList": [storeID]
            };
            SEARCH.getCategories(params, function (r) {
                if (r.code === kraft.gs.statusCodeFailure) {
                    callback();
                    return;
                }

                callback(r);
            });
            return true;
        },
        setStorePreferences: function (storeIDs, callback) {
            var params = {
                "zipCode": kraft.utilities.readCookie('kraft_sessionZip'),
                "stores": storeIDs
            };
            USER.setUserProfile(params, function (r) {
                if (r.status.code === kraft.gs.statusCodeFailure) {
                    console.log('----------------- setting user stores failed');
                    return;
                }

                console.log('-------------------- setting user stores successful');
                callback(r);
            });
            return true;
        },
        getDealsByStoreAndCategory: function (zipCode, storeID, categoryID, offset, max, callback) {
            var params = {
                "chainIdList": [storeID],
                "zipCode": zipCode,
                "categoryIdList": [categoryID],
                //"type":["special"],
                "offset": offset,
                "maxResult": max,
                "totalsFlag": "true"
            };
            SEARCH.getPromotionsByChainsAndCategory(params, function (r) {
                if (r.code === kraft.gs.statusCodeFailure) {
                    console.log('------ FAIL ---------');
                    return;
                }

                console.log('------ SUCCESS ---------');
                callback(r);
            });
            return true;
        },
        getDealsByStore: function (zipCode, storeID, offset, max, callback) {
            var params = {
                "chainIdList": [storeID],
                "zipCode": zipCode,
                "offset": offset,
                "maxResult": max,
            };
            SEARCH.getPromotionsByChain(params, function (r) {
                if (r.code === kraft.gs.statusCodeFailure) {
                    console.log('------ FAIL By Chain ---------');
                    return;
                }

                console.log('------ SUCCESS By Chain ---------');
                callback(r);
            });
            return true;
        },
        getDealsByItems: function(itemsArray, zipCode, chainId, offset, max, callback) {
            var params = {
                "searchTerms":itemsArray,
                "zipCode": zipCode,
                "chainIds": [chainId],
                //"brand":"true",
                "types": ["coupon","special","electronic"],
                "offset": offset,
                "maxResult": max
            };
            SEARCH.getPromotionsForSearchTerms(params, function (r) {
                if (r.code === kraft.gs.statusCodeFailure) {
                    console.log('------ FAIL By Items ---------');
                    return;
                }

                console.log('------ SUCCESS By Items ---------');
                callback(r);
            });
            return true;
        }
    },

    shoppingList: {
        emailList: function (from, to, subject, shoppingListId, callback, trigger) {

            //console.log(from + " :: " + to + " :: " + subject + " :: " + shoppingListId + " :: " + kraft.utilities.readCookie("kraft_sessionZip"));
            var postParameters = {
                email: to,
                from: from,
                subject: subject,
                shoppingListId: shoppingListId,
                zipCode: kraft.utilities.readCookie("kraft_sessionZip")
            };
            kraft.utilities.loadingSpinner.show(trigger);
            $(trigger).parent().find(".gserror").remove();
            SL.emailUserShoppingList(postParameters, function (r) {
                console.log(r);
                if (r.status.code === kraft.gs.statusCodeSuccess) {
                    callback();
                } else {
                    $(trigger).parent().append("<div class='error gserror'>" + r.status.errorMessage + "<div>");
                }
            });
        },
        addRecipe: function (recipeId, callback) {
            console.log("recipe id:" + recipeId);
            var shoppingListId = kraft.utilities.readCookie("GroceryServerShoppingListId");
            console.log("shopping list id: " + shoppingListId);
            var postParameters = {
                shoppingListId: shoppingListId,
                recipeId: recipeId,
                zipCode: "44333"
            };
            console.log(postParameters);
            console.log("Adding recipe with id: " + recipeId);

            SL.addRecipeByIdToShoppingList(postParameters, function (r) {
                console.log(r);
                if (r.id) {
                    callback();
                }
            });

            return true;
        },
        addRecipeByExternalId: function (recipeId, sourceId, callback) {
            console.log("getting the recipe from GS using the SWEET ID");
            var params = { externalId: recipeId, sourceId: sourceId, url: null };
            console.log(params);
            var groceryServerRecipeId = 0;
            RECIPE.getRecipeByExternalId(params, function (r) {
                console.log(r);
                kraft.gs.lastResponse = r;
                if (r && r.status && r.status.code === kraft.gs.statusCodeSuccess) {
                    //kraft.utilites.eraseCookie("kraft_unfinishedBusiness");
                    //TODO: Decide what to do if we get too many results (should never happen if we have the sourceId set)
                    if (r.totalCount === 1) { //this is basically a sanity check, there should alway only be one if we've gotten this far)
                        var id = r.recipes[0].id;
                        kraft.gs.shoppingList.addRecipe(id, callback);
                    }
                }
            });
        },
        removeRecipe: function (recipeId, callback) {
            //TODO: check login status
            console.log("recipe id:" + recipeId);
            var shoppingListId = kraft.utilities.readCookie("GroceryServerShoppingListId");
            console.log("shopping list id: " + shoppingListId);
            var postParameters = {
                shoppingListId: shoppingListId,
                recipeIdList: [recipeId]
            };
            console.log("Removing recipe with id: " + recipeId);
            SL.removeItem(postParameters, function (r) {
                console.log(r);
                if (r.id) {
                    callback();
                }
            });

            return true;
        },
        removeRecipeByExternalId: function (recipeId, sourceId, callback) {
            console.log("getting the recipe from GS using the SWEET ID");
            var params = { externalId: recipeId, sourceId: sourceId, url: null };
            console.log(params);
            var groceryServerRecipeId = 0;
            RECIPE.getRecipeByExternalId(params, function (r) {
                console.log(r);
                kraft.gs.lastResponse = r;
                if (r && r.status && r.status.code === kraft.gs.statusCodeSuccess) {
                    //TODO: Decide what to do if we get too many results (should never happen if we have the sourceId set)
                    if (r.totalCount === 1) { //this is basically a sanity check, there should alway only be one if we've gotten this far)
                        var id = r.recipes[0].id;
                        kraft.gs.shoppingList.removeRecipe(id, callback);
                    }
                }
            });
        },
        addRecipeIngredientToShoppingList: function (ingredients, shoppingListId, callback) {
            var request = {
                shoppingListId: shoppingListId,
                shoppingListEntry: [],
                tinyResponse: false
            };
            //var ingredients = JSON.parse(ingredients);
            console.log(ingredients);
            console.log("length " + ingredients.length);
            for (var i = 0; i < ingredients.length; i++) {
                var ingredient = ingredients[i];
                console.log(ingredient);
                var entry = {
                    idValue: ingredient.id,
                    idValue1: kraft.recipeId,
                    idType: "recipeIngredient",
                    searchTerm: ingredient.name
                };
                console.log(entry);
                request.shoppingListEntry.push(entry);
            }
            console.log(typeof ingredients);
            console.log(request);
            SL.addItem(request, function (r) {
                console.log(r);
                if (r.id) {
                    callback();
                }
            });
        },
        editShoppingListName: function (newShoppingListName, callback) {

            //check if edited name already exists
            var alreadyExists = false,
                newName,
                status;

            gsapi.shoppingList.getNamedShoppingLists(function (r) {
                console.log(r);

                for (var i = 0; i < r.namedShoppingLists.length; i++) {
                    if (r.namedShoppingLists[i].shoppingListName === newShoppingListName) {
                        alreadyExists = true;
                    }
                }

                if (alreadyExists) {
                    callback(alreadyExists);
                } else {

                    var shoppingListId = window.location.search.substr(1).split('=').slice(1);

                    SL.editShoppingList(shoppingListId, newShoppingListName, function (r) {
                        console.log(r);
                        var alreadyExists = false,
                            newName = r.name,
                            status = r.status.code;
                        callback(alreadyExists, newName, status);
                    });
                }
            });

            return true;
        },
        deleteShoppingList: function () {
           var shoppingListId = window.location.search.substr(1).split('=').slice(1);

            SL.expireShoppingList(shoppingListId, function (r) {
                console.log(r);
                if (r.status.code === kraft.gs.statusCodeSuccess) {
                    window.location.replace($('.delete-shopping-list-confirm').attr("data-success-url"));
                } else {
                    console.log("FAILURE Deleting Shopping List ID: " + shoppingListId);
                }
           });
        },
        editIngredient: function (shoppingListId, shoppingListItemId, unit, quantity, note, callback) {

            var postParameters = {
                shoppingListId: shoppingListId,
                shoppingListItemId: shoppingListItemId,
                unit: unit,
                quantity: quantity,
                note: note,
                tinyResponse: false
            };
            console.log(postParameters);

            SL.editShoppingListItem(postParameters, function (r) {
                console.log(r);
                callback();
            })
        },
        deleteIngredient: function (shoppingListId, shoppingListItemId, isFreeForm, isProduct, callback) {

            var postParameters = {
                shoppingListId: shoppingListId
            };

            if (isFreeForm) {
                postParameters.freeFormIngredientId = shoppingListItemId;
            }
            else if (isProduct) {
                postParameters.shoppingListUpcItemId = shoppingListItemId;
            } else {
                postParameters.shoppingListItemId = shoppingListItemId;
            }

            SL.removeItem(postParameters, function(r) {
                console.log(r);
                callback();
            });
        }
    },
    getRecipeSummaryByExternalId: function (recipeIdCollection, callback) {

        var params = { externalIdList: recipeIdCollection };

        RECIPE.getRecipeSummaryByExternalId(params, function (response) {
            kraft.gs.lastResponse = response;
            if (response && response.status && response.status.code === kraft.gs.statusCodeSuccess) {
                callback(response);
            }
        });
    },

    init: function () {
        $(document).ready(function () {
            kraft.gs.createGroceryServerSession();
            if (kraft.utilities.checkAuth()) {
                kraft.gs.login();
            }
        });
    }
};
kraft.gs.init();