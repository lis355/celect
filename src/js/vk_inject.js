'use strict';

(function () {
	console.log("START");

	const ELEMENT_NODE = 1;

	let selector = ".stories_feed_wrap, #feed_filters, #chat_onl_wrap";

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

		doDelete(selectNodes(node));// document.querySelectorAll(selector));
	}
	
	let mutationObserver = new MutationObserver(function (mutations) {
		console.log(`Mutations ${mutations.length}`);
		for (let mutation of mutations) {
			for (let node of mutation.addedNodes) {
				if (node.nodeType === ELEMENT_NODE)
					processNode(node);
			}
		}
	});

	mutationObserver.observe(document, {subtree: true, childList: true});

	/*document.addEventListener("DOMContentLoaded", function () {
		mutationObserver.disconnect();
	});*/
	
	/*let idsToRemove = ["feed_filters"];
	let classToRemove = ["stories_feed_wrap"];
	
	function removeElement(element) {
		if (element
			&& element.parentNode)
			element.parentNode.removeChild(element);
	}
	
	for (let elementName of classToRemove)
		for (let element of document.getElementsByClassName(elementName)) {
			console.log("FIND " + elementName);
			removeElement(element);
		}
	
	for (let elementName of idsToRemove)
		removeElement(document.getElementById(elementName));*/

	console.log("FINISH");
}());
