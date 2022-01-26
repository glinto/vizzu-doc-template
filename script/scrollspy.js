const SCROLLSPY_OFFSET = 300;

export default class ScrollSpy {
	constructor(contextElement) {

		this.ticking = false;
		this.contextElement = contextElement;

		this.watchElement = this.contextElement.querySelector('[data-spy="scroll"]');

		document.addEventListener('scroll',
			() => { this.frameScroll() },
			{ passive: true }
		);
	}

	updateScroll() {
		// update the target element's data-scroll property
		this.contextElement.dataset.scroll = window.scrollY;
		// fire debounced scroll event from the target element
		let event = new CustomEvent('debounce-scroll', { detail: { scrollY: window.scrollY } });
		this.contextElement.dispatchEvent(event);

		// Update the target menu based on the current scroll position
		if (this.watchElement) {
			// get the menu elements bound to the scrolled content
			let selector = this.watchElement.dataset.spyTargetSelector;
			let elems = this.contextElement.querySelectorAll(`${selector} li a[href]`);
			// get body bounding box
			let bodyRect = document.body.getBoundingClientRect();

			let lastElement = undefined;

			// iterate over the menu elements
			elems.forEach((elem) => {
				elem.classList.remove('active');
				// check if the referenced anchor is in or above the viewport
				let targetElem = document.getElementById(elem.getAttribute('href').substr(1));
				if (targetElem) {
					let targetRect = targetElem.getBoundingClientRect();
					if (targetRect.top - bodyRect.top - SCROLLSPY_OFFSET < window.scrollY)
						lastElement = elem;
				}
			});
			// active the last menu element whose content target is in or above the viewport
			if (lastElement)
				lastElement.classList.add('active');
		}


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