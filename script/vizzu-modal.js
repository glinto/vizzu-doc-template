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
					<h2 class="mt-0 mb-2 me-2 ellipses">Modal title</h2>
				</div>
				<div class="vizzu-modal-spinner text-center d-none py-4">
					<div class="spinner-grow" role="status"></div>
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
		iframe.allowFullscreen = false;
		iframe.classList.add('d-none');

		let spinner = this.querySelector('.vizzu-modal-spinner');
		spinner.classList.remove('d-none');

		placeholder.appendChild(iframe);
		iframe.addEventListener("load", (event) => {
			iframe.classList.remove('d-none');
			spinner.classList.add('d-none');
			let height = Math.min(iframe.contentWindow.document.body.scrollHeight + 48, window.innerHeight - 128);
			//console.log(iframe.contentWindow.document.body.scrollHeight, window.innerHeight, height)
			iframe.style.height = height + "px";

		});

		this.querySelector('h2').innerText = title;
	}
}