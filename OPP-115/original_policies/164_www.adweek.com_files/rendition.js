/**
* Handles always selecting the highest rendition when the player determines a new rendition can be played.
*/

var _player;
var _experienceModule;

/**
* Event handler for when the player the player first loads.
*
* @param  id  The HTML ID of the player.
*/
function onTemplateLoaded(id) {
    _player = brightcove.getExperience(id);
    _experienceModule = _player.getModule("experience");
    _experienceModule.addEventListener("templateReady", onTemplateReady);
	var videoPlayer = _player.getModule("videoPlayer");
    if (videoPlayer) {
        // set callback function for rendition selection
        videoPlayer.setRenditionSelectionCallback(selectRendition);
    }
}

/**
* Event handler for when the player is ready for interaction.
*
* @param  event  Event dispatched by player experience module.
*/
function onTemplateReady(event) {
    _experienceModule.removeEventListener("templateReady", onTemplateReady);
}

/**
* The callback invoked whenever the player reaches a point when a new selection can be selected. This will occur on initial playback
* as well, for streaming videos, when there are multiple buffering events or when the screen size changed, as when going full screen.
* This method must take an object as an argument and return an int value that represents the index of the rendition to play.
* If the renditionIndex value returned is -1, or any other value that doesn't correspond to the index of an available rendition, the
* player recalculates which rendition to use, using the normal selection algorithm.
*
* @param  context  The context that the player uses to select a new rendition. This object includes the following properties:
*           video  The video currently playing to which the renditions belong.
*           currentRendition  The currently selected rendition for the video.
*           renditions  An Array of renditions for the video to choose from.
*           detectedBandwidth  The last detected bandwidth value.
*           screenWidth  The pixel width of the video screen in which the rendition will play.
*           screenHeight  The pixel height of the video screen in which the rendition will play.
*
* @returns  The index of the rendition in the renditions list for the video player to play.
*/
function selectRendition(context) {
    var renditions = context.renditions;
    var renditionIndex = -1;
    var size = 0;
    for (var i = 0; i < renditions.length; i++) {
        // set the rendition index for the rendition with the largest size
        if (renditions[i].size > size) {
            size = renditions[i].size;
            renditionIndex = i;
        }
    }
    return renditionIndex;
}

/**
* Traces out the values of rendition for testing.
*
* @param  rendition  The rendition to traces values for.
* @param  index  The index in the renditions array where this rendition is found.
*/
function describeRendition(rendition) {
    var message = ("size: " + rendition.size);
    message += ("\nframeWidth: " + rendition.frameWidth);
    message += ("\nframeHeight: " + rendition.frameHeight);
    message += ("\nencodingRate: " + rendition.encodingRate);
    alert(message);
}