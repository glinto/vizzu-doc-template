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
		console.log(html);
		this.classList.remove('d-none');
		this.querySelector('.vizzu-modal-content-placeholder').innerHTML = html;
		this.querySelector('h2').innerText = title;
	}
}