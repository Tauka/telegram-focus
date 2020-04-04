let MAX_SCROLLS = 5;

const removeDialogs = () =>
{
	setTimeout(() =>
	{
		if(MAX_SCROLLS > 0)
		{
			document.querySelector(".im_dialogs_scrollable_wrap")
				.scrollTop = 1000;

			MAX_SCROLLS--;
		}

		setTimeout(() =>
		{
			chrome.storage.sync.get({
				whitelistItems: []
			}, function({ whitelistItems }) {
				const dialogs = document.querySelectorAll(".im_dialog");

				Array.prototype.forEach.call(dialogs, node =>
				{
					const nameSpan = node.querySelector(".im_dialog_peer span")
					if(whitelistItems.some(item => item === nameSpan.textContent))
						return;

					node.parentNode.removeChild(node);
				});

				window.requestIdleCallback(removeDialogs)
			});
		}, 100)
	}, 0)
}

removeDialogs();