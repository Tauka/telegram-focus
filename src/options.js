document.getElementById('dialog-add').addEventListener('click',
	add_dialog);

const input = document.getElementById("dialog-input");
const allowedList = document.getElementById("allowed-list");


function add_dialog()
{
	chrome.storage.sync.get({
		whitelistItems: []
	}, function({ whitelistItems }) {
		chrome.storage.sync.set(
		{
			whitelistItems: [...whitelistItems, input.value ]
		},
		() =>
		{
			render_list();
		})
	});
}

function removeItem(rmItem)
{
	chrome.storage.sync.get({
		whitelistItems: []
	}, function({ whitelistItems }) {
		chrome.storage.sync.set(
		{
			whitelistItems: whitelistItems.filter(item => item !== rmItem)
		},
		() =>
		{
			render_list();
		})
	});
}

function render_list()
{
	chrome.storage.sync.get({
		whitelistItems: []
	}, function({ whitelistItems }) {
		let alItems = '';
		const frag = document.createDocumentFragment();
		allowedList.innerHTML = "";
		whitelistItems.forEach(item =>
		{
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.textContent = "X";
			button.addEventListener("click", () =>
			{
				removeItem(item);
			})
			li.textContent = item;
			li.appendChild(button);
			frag.appendChild(li);
		});

		allowedList.appendChild(frag);
	});
}

render_list();