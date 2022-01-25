export default class VizzuModal extends HTMLElement {
	constructor() {
		super();
		this.classList.add('d-none');
	}

	connectedCallback() {
		this.innerHTML = `
		<div class="container d-flex flex-column justify-content-center vizzu-modal-content p-4">
			<div class="vizzu-modal-content-inner bg-white p-4 depth-shadow">
				<div class="d-flex align-items-center justify-content-between">
					<h2 class="my-2">Modal title</h2>
					<span class="c-pointer"><img src="images/close_black_24dp.svg" alt="Close" height="24"></span>
				</div>

				<div class="vizzu-modal-content-placeholder">placeholder</div>
			</div>
		</div>		
		`;

		this.querySelector('.c-pointer img').addEventListener('click', (event) => {
			this.classList.add('d-none');
			this.querySelector('.vizzu-modal-content-placeholder').innerHTML = '';
			event.preventDefault();
		});
	}

	show(html, title) {
		this.classList.remove('d-none');
		this.querySelector('.vizzu-modal-content-placeholder').innerHTML = html;
		this.querySelector('h2').innerText = title;
	}

	showUrl(url, title) {
		this.classList.remove('d-none');
		let placeholder = this.querySelector('.vizzu-modal-content-placeholder');
		placeholder.innerHTML = '';

		let iframe = document.createElement('iframe');
		iframe.src = url;
		iframe.width = '100%';
		iframe.height = '100%';
		iframe.allowFullscreen = false;

		placeholder.appendChild(iframe);
		iframe.addEventListener("load", (event) => {
			let height = Math.min(iframe.contentWindow.document.body.scrollHeight + 48, window.outerHeight - 48);
			iframe.style.height = height + "px";
		});

		//placeholder.innerHTML = `<iframe src="${url}" width="100%" height="100%" frameborder="0"
		//onload="this.style.height = Math.min(this.contentWindow.document.body.scrollHeight, document.body.scrollHeight) + 'px'"
		//></iframe>`;

		this.querySelector('h2').innerText = title;
	}
}