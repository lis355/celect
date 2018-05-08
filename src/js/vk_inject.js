'use strict';

(function () {

	//let module_1 = require("./modules/module_1");
	//console.log(module_1.a());

	console.log("START");

	let $ = require("jquery");
	let selector = ".stories_feed_wrap, .ui_rmenu, .people_module, .friends_photo_img, .nim-peer--photo, .feed_post_field_wrap, #feed_filters, #chat_onl_wrap, #friends_possible_block";

	/*const ELEMENT_NODE = 1;

	function processNode(node) {
		function selectNodes(node) {
			if (node.matches(selector))
				return [node];

			return node.querySelectorAll(selector)
		}

		function doDelete(nodes) {
			[].forEach.call(nodes, function (node) {
				node.remove()
			});
		}

		doDelete(selectNodes(node));
	}*/

	let mutationObserver = new MutationObserver(function (mutations) {
		//console.log(`Mutations ${mutations.length}`);
		/*for (let mutation of mutations) {
			for (let node of mutation.addedNodes) {
				if (node.nodeType === ELEMENT_NODE)
					processNode(node);
			}
		}*/

		$(selector).remove();

		chrome.runtime.sendMessage({msg: "mutationsEvent", mutationsCount: mutations.length});
		console.log("MSG");
	});

	mutationObserver.observe(document, {subtree: true, childList: true});

	console.log("FINISH");
}());
