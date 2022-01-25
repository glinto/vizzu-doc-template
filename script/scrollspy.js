class ScrollSpy {
	constructor() {
		const debounceScroll = new CustomEvent('debounce-scroll');
		this.ticking = false;

		document.addEventListener('scroll',
			() => { this.frameScroll() },
			{ passive: true }
		);
	}

	updateScroll() {
		document.documentElement.dataset.scroll = window.scrollY;
		let event = new CustomEvent('debounce-scroll', { detail: { scrollY: window.scrollY } });
		document.documentElement.dispatchEvent(event);
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