/**
* Basic framework to keep components' validation chain persistence.
* No UI involved, controller only.
*/
if (typeof INTERNAL_CORE === "undefined") {
	var INTERNAL_CORE = {};
}
(function ($IC) {

	/*** EVENTS ***/
	if ($IC.EVENTS === undefined) {
		$IC.EVENTS = {};
	}
	(function ($E) {
		//no events specified yet.
	})($IC.EVENTS);

	/*** CONST ***/
	if ($IC.CONST === undefined) {
		$IC.CONST = {};
	}
	(function ($C) {
		$C.FPS = 60;
	})($IC.CONST);

	/*** SNIPPETS ***/
	if ($IC.SNIPPETS === undefined) {
		$IC.SNIPPETS = {};
	}
	(function ($S) {
		$S.nodeJS_sandbox = typeof module !== 'undefined' && module.exports;
		$S.requestAnimationFrame = typeof window !== 'undefined' ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame : undefined;
		$S.cancelAnimationFrame = typeof window !== 'undefined' ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame : undefined;
	})($IC.SNIPPETS);

	/*** UTILS ***/
	if ($IC.UTILS === undefined) {
		$IC.UTILS = {};
	}
	(function ($U) {
		$U.extend = function (subClass, superClass) {
			var inheritance = function () {};
			inheritance.prototype = superClass.prototype; 
			subClass.prototype = new inheritance();
			subClass.prototype.constructor = subClass;
			subClass.baseConstructor = superClass;	//used to call superClass constructor from baseClass constructor
		};
		$U.PolyfillArray = function () {
			var	_this = this;
			$U.PolyfillArray.baseConstructor.apply(_this, arguments);
		};
		$U.extend($U.PolyfillArray, Array);
		if (!$U.PolyfillArray.prototype.indexOf) {
			$U.PolyfillArray.prototype.indexOf = function (searchElement, fromIndex) {
				if ( this === undefined || this === null ) {
					throw new TypeError('"this" is null or not defined');
				}
				var length = this.length >>> 0;	//hack to convert object.length to a UInt32
				fromIndex = +fromIndex || 0;
				if (Math.abs(fromIndex) === Infinity) {
					fromIndex = 0;
				}
				if (fromIndex < 0) {
					fromIndex += length;
					if (fromIndex < 0) {
						fromIndex = 0;
					}
				}
				for (;fromIndex < length; fromIndex++) {
					if (this[fromIndex] === searchElement) {
						return fromIndex;
					}
				}
				return -1;
			};
		}

		$U.polyfillAddEventListener = function (eventDispatcher, eventName, listener, useCapture) {
			if (eventDispatcher.addEventListener) {
				eventDispatcher.addEventListener(eventName, listener, useCapture);
			} else if (eventDispatcher.attachEvent) {
				eventDispatcher.attachEvent('on' + eventName, listener);
			}
		};

		$U.polyfillRemoveEventListener = function (eventDispatcher, eventName, listener, useCapture) {
			if (eventDispatcher.removeEventListener) {
				eventDispatcher.removeEventListener(eventName, listener, useCapture);
			} else if (eventDispatcher.detachEvent) {
				eventDispatcher.detachEvent('on' + eventName, listener);
			}
		};

	})($IC.UTILS);

	/*** INTERNAL UTILS ***/
	var $SANDBOX_MANAGER;
	(function () {
		/**
		* Stores dependencys.
		* Prevents formation of cyclic dependencies.
		* Keeps sandbox stable.
		*/
		var singleton_exists = false;
		var IC_Sandbox_Manager = function () {
			if (singleton_exists) {
				return $SANDBOX_MANAGER;
			}
			singleton_exists = true;

			/**
			* Private vars.
			* These vars is accessible via getters.
			*/
			var _this = this;

			/**
			* Utility vars.
			*/
			var	_u_component_id_counter,
				_u_id_map,
				_u_owners;

			/**
			* Initialization.
			*/
			(function () {
				_u_component_id_counter = 0;
				_u_id_map = new $IC.UTILS.PolyfillArray();
				_u_owners = new $IC.UTILS.PolyfillArray();
			})();

			/**
			* Called from init() only.
			*/
			_this.register = function (component) {
				if (!(component instanceof $IC.Component)) {
					throw new TypeError('"component" is not instance of INTERNAL_CORE.Component');
				}
				if (component.id() != undefined) {
					return component.id();
				}
				_u_id_map[_u_component_id_counter] = component;
				return _u_component_id_counter++;
			};

			/**
			* Called from destroy() only.
			*/
			_this.unregister = function (component) {
				if (!(component instanceof $IC.Component)) {
					throw new TypeError('"component" is not instance of INTERNAL_CORE.Component');
				}
				_u_id_map[component.id()] = null;
			};

			_this.setComponentOwner = function (component, owner) {
				if (!(component instanceof $IC.Component)) {
					throw new TypeError('"component" is not instance of INTERNAL_CORE.Component');
				}
				if (owner !== undefined && !(owner instanceof $IC.Component)) {
					throw new TypeError('"owner" is not instance of INTERNAL_CORE.Component');
				}
				if (owner !== undefined && component === owner) {
					throw new Error('"component" can not depend on itself');
				}
				/**
				* Check if owner depends on component.
				*/
				var passedComponentID;
				passedComponentID = component.id();
				if (owner !== undefined) {
					var	componentID,
						ownerComponentID;
					ownerComponentID = owner.id();
					do {
						componentID = ownerComponentID;
						ownerComponentID = _u_owners[componentID];
					} while (ownerComponentID !== undefined && ownerComponentID !== passedComponentID);
					if (ownerComponentID === passedComponentID) {
						throw new Error('Cyclic dependencies is not allowed');
					}
				}
				_u_owners[passedComponentID] = owner ? owner.id() : undefined;
			};

			_this.getComponentOwner = function (component) {
				if (!(component instanceof $IC.Component)) {
					throw new TypeError('"component" is not instance of INTERNAL_CORE.Component');
				}
				return _u_id_map[_u_owners[component.id()]];
			};

			_this.getTopLevelComponent = function (component) {
				if (!(component instanceof $IC.Component)) {
					throw new TypeError('"component" is not instance of INTERNAL_CORE.Component');
				}
				var	componentID,
					ownerComponentID;
				ownerComponentID = component.id();
				do {
					componentID = ownerComponentID;
					ownerComponentID = _u_owners[componentID];
				} while (ownerComponentID !== undefined);
				return _u_id_map[componentID];
			};
		};
		$SANDBOX_MANAGER = new IC_Sandbox_Manager();
	})();

	/*** CLASSES ***/
	/**
	* Event observer OOP pattern.
	*/
	$IC.EventDispatcher = function () {
		/**
		* Private vars.
		* These vars is accessible via getters.
		*/
		var _this = this;
		var _eventToListenersMap;

		_this.addEventListener = function (type, listener) {
			if (typeof type !== "string") {
				throw new TypeError('"type" type is not "string"');
			}
			if (typeof listener !== "function") {
				throw new TypeError('"listener" type is not "function"');
			}
			if (!_eventToListenersMap[type]) {
				_eventToListenersMap[type] = new $IC.UTILS.PolyfillArray();
			}
			var	array,
				index;
			array = _eventToListenersMap[type];
			index = array.indexOf(listener);
			if (index != -1) {
				array.splice(index, 1);
			}
			array.push(listener);
		};

		_this.removeEventListener = function (type, listener) {
			if (typeof type !== "string") {
				throw new TypeError('"type" type is not "string"');
			}
			if (typeof listener !== "function") {
				throw new TypeError('"listener" type is not "function"');
			}
			var	array;
			array = _eventToListenersMap[type];
			if (array) {
				var index;
				index = array.indexOf(listener);
				if (index != -1) {
					array.splice(index, 1);
				}
			}
		};

		/**
		* event should be presented by a plain object.
		* The following structure is preferred:
		* {
		*	type: 'type',
		*	target: target_component_instance,
		*	defaultPrevented: false
		* }
		* where target_component_instance is the current component - instance which is dispatching event.
		* A false return value indicates failure or that defaultPrevented prop was specified to true for the event.
		*/
		_this.dispatchEvent = function (event) {
			if (typeof event !== "object") {
				throw new TypeError('"event" type is not "object"');
			}
			if (event === null) {
				throw new Error('null event value passed');
			}
			if (_this.hasEventListener(event.type)) {
				var i,
					array;
				array = _eventToListenersMap[event.type];
				for (i = 0 ; i < array.length ; i++) {
					array[i].call(_this, event);
				}
				return !event.defaultPrevented;
			} else {
				return false;
			}
		};

		_this.hasEventListener = function (type) {
			if (typeof type !== "string") {
				throw new TypeError('"type" type is not "string"');
			}
			if (!_eventToListenersMap) {
				return false;
			}
			var array;
			array = _eventToListenersMap[type];
			if (!array || array.length === 0) {
				return false;
			}
			return true;
		};

		/**
		* Initialization.
		*/
		(function () {
			_eventToListenersMap = {};
		})();
	};

	/**
	* Component OOP pattern.
	*/
	$IC.Component = function () {
		/**
		* Private vars.
		* These vars is accessible via getters.
		*/
		var _this = this;
		var	_id,
			_invalid,
			_dependentComponents;

		/**
		* Flags indicating changes.
		*/
		//no flags.

		/**
		* Utility vars.
		*/
		var	_u_render_event_id;

		/**
		* Inheritance.
		*/
		$IC.Component.baseConstructor.call(_this);

		var lifeCycle = function () {
			if (!$IC.SNIPPETS.nodeJS_sandbox) {
				_u_render_event_id = undefined;
			}
			/* else {
				NodeJS case.
			}*/
			if (!_invalid) {
				return;
			}
			var topLevelComponent;
			topLevelComponent = $SANDBOX_MANAGER.getTopLevelComponent(_this);
			topLevelComponent.validate();
		};

		var subscribeForScreenRenderEvent = function () {
			if (!$IC.SNIPPETS.nodeJS_sandbox) {
				if (_u_render_event_id === undefined) {
					if ($IC.SNIPPETS.requestAnimationFrame) {
						_u_render_event_id = $IC.SNIPPETS.requestAnimationFrame.call(window, lifeCycle);
					} else {
						_u_render_event_id = window.setTimeout(lifeCycle, 1000 / $IC.CONST.FPS);
					}
				}
			}
			/* else {
				NodeJS case.
			}*/
		};

		var unsubscribeFromScreenRenderEvent = function () {
			if (!$IC.SNIPPETS.nodeJS_sandbox) {
				if (_u_render_event_id !== undefined) {
					if ($IC.SNIPPETS.cancelAnimationFrame) {
						$IC.SNIPPETS.cancelAnimationFrame.call(window, _u_render_event_id);
					} else {
						window.clearTimeout(_u_render_event_id);
					}
					_u_render_event_id = undefined;
				}
			}
			/* else {
				NodeJS case.
			}*/
		};

		_this.invalidate = function () {
			if (_invalid) {
				return;
			}
			if (!$IC.SNIPPETS.nodeJS_sandbox) {
				subscribeForScreenRenderEvent();
			}
			/* else {
				NodeJS case.
			}*/
			_invalid = true;
		};

		/**
		* This method should handle all changes made during last frame.
		* Changed properties is indicated via flags (see Flags at the class beginning).
		*/
		_this.validate = function () {
			var	i,
				dependentComponents_copy;
			dependentComponents_copy = _dependentComponents.slice();
			for (i = 0 ; i < dependentComponents_copy.length ; i++) {
				dependentComponents_copy[i].validate();
			}
			_invalid = false;
		};

		_this.addDependentComponentAt = function (component, index) {
			if (!(component instanceof $IC.Component)) {
				throw new TypeError('"component" is not instance of INTERNAL_CORE.Component');
			}
			if (component === _this) {
				throw new Error('INTERNAL_CORE.Component can not depend on itself');
			}
			if (component.getOwner()) {
				throw new Error('"component" already depends on another');
			}
			if (typeof index !== "number") {
				throw new TypeError('"index" type is not "number"');
			} else if (isNaN(index)) {
				throw new TypeError('NaN "index" value passed');
			}
			if (index < 0 || index > _dependentComponents.length) {
				throw new RangeError('"index" is out of range');
			}
			$SANDBOX_MANAGER.setComponentOwner(component, _this);
			var currentIndex = _dependentComponents.indexOf(component);
			if (currentIndex == -1) {
				_dependentComponents.splice(index, 0, component);
			} else if (currentIndex != index) {
				_dependentComponents.splice(currentIndex, 1);
				if (index > currentIndex) {
					index --;
				}
				_dependentComponents.splice(index, 0, component);
			}
			return component;
		};

		_this.addDependentComponent = function (component) {
			return _this.addDependentComponentAt(component, _dependentComponents.length);
		};

		_this.getDependentComponentAt = function (index) {
			if (typeof index !== "number") {
				throw new TypeError('"index" type is not "number"');
			} else if (isNaN(index)) {
				throw new TypeError('NaN "index" value passed');
			}
			if (index < 0 || index > _dependentComponents.length - 1) {
				throw new RangeError('"index" is out of range');
			}
			return _dependentComponents[index];
		};

		_this.removeDependentComponentAt = function (index) {
			if (typeof index !== "number") {
				throw new TypeError('"index" type is not "number"');
			} else if (isNaN(index)) {
				throw new TypeError('NaN "index" value passed');
			}
			if (index < 0 || index > _dependentComponents.length - 1) {
				throw new RangeError('"index" is out of range');
			}
			var component = _dependentComponents[index];
			$SANDBOX_MANAGER.setComponentOwner(component, undefined);
			_dependentComponents.splice(index, 1);
			return component;
		};

		_this.removeDependentComponent = function (component) {
			if (!(component instanceof $IC.Component)) {
				throw new TypeError('"component" is not instance of INTERNAL_CORE.Component');
			}
			var index = _dependentComponents.indexOf(component);
			if (index == -1) {
				throw new Error('Passed "component" is not presented in current component\'s dependencies list');
			}
			$SANDBOX_MANAGER.setComponentOwner(component, undefined);
			_dependentComponents.splice(index, 1);
			return component;
		};

		_this.getOwner = function () {
			return $SANDBOX_MANAGER.getComponentOwner(_this);
		};

		_this.id = function () {
			return _id;
		};

		_this.destroy = function () {
			if (_dependentComponents.length !== 0) {
				throw new Error('component has dependents');
			}
			var owner = _this.getOwner();
			if (owner) {
				owner.removeDependentComponent(_this);
			}
			unsubscribeFromScreenRenderEvent();
			$SANDBOX_MANAGER.unregister(_this);
			_invalid = false;
			_dependentComponents = null;
			_this = null;
		};

		/**
		* Initialization.
		*/
		(function () {
			_id = $SANDBOX_MANAGER.register(_this);
			_invalid = false;
			_dependentComponents = new $IC.UTILS.PolyfillArray();

			_u_render_event_id = undefined;
		})();
	};
	$IC.UTILS.extend($IC.Component, $IC.EventDispatcher);

})(INTERNAL_CORE);
