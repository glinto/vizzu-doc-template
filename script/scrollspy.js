export default class ScrollSpy {
	constructor(targetElement) {
		const debounceScroll = new CustomEvent('debounce-scroll');
		this.ticking = false;
		this.targetElement = targetElement;

		document.addEventListener('scroll',
			() => { this.frameScroll() },
			{ passive: true }
		);
	}

	updateScroll() {
		this.targetElement.dataset.scroll = window.scrollY;
		let event = new CustomEvent('debounce-scroll', { detail: { scrollY: window.scrollY } });
		this.targetElement.dispatchEvent(event);
	}

	frameScroll() {
		if (this.ticking) {
			return;
		}
		this.ticking = true;
		requestAnimationFrame(() => {
			this.updateScroll();
			this.ticking = false;
		});
	}

}