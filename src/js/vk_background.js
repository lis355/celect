'use strict';

(function () {
	console.log("START BACKGROUND");

	chrome.runtime.onMessage.addListener(
		function (request/*, sender, sendResponse*/) {
			console.log("MSG");
			console.log(request);

			switch (request.msg) {
				case "mutationsEvent":

					chrome.browserAction.setBadgeText({text: request.mutationsCount.toString()});
					chrome.browserAction.setBadgeBackgroundColor({color: [128, 128, 128, 255]});

					break;
				default:
					throw new Error(request);
			}
		});
}());
