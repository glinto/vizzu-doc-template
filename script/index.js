import ScrollSpy from "./scrollspy.js";

export default class VizzuDocumentation {

	constructor(context) {
		this.context = context;
		this.scrollSpy = new ScrollSpy(this.context);

		document.addEventListener("DOMContentLoaded", (event) => {
			document.querySelector('.action-sidebar-toogle').addEventListener('click', (event) => {
				this.toggleSideBar();
				event.preventDefault();
			});
			document.querySelector('.vizzu-sidebar-scrim').addEventListener('click', (event) => {
				this.closeSideBar();
				event.preventDefault();
			});
			/* When we click a link on the sidebar, it will close the sidebar (on mobiles) */
			document.querySelectorAll('.vizzu-sidebar a[href]').forEach((element) => {
				element.addEventListener('click', (event) => {
					this.closeSideBar();
				});
			});
			/* Static thumbnails */
			document.querySelectorAll('img.thumbnail-static').forEach((element) => {
				element.addEventListener('click', (event) => {
					document.querySelector('vizzu-modal').showUrl(event.target.dataset.target, event.target.alt);
				});
			});
			/* Animated thumbnails */
			document.querySelectorAll('video.thumbnail-animated').forEach((element) => {
				element.addEventListener('click', (event) => {
					document.querySelector('vizzu-modal').showUrl(event.target.dataset.target, event.target.title);
				});
			});
		});
	}


	toggleSideBar() {
		document.querySelector('.vizzu-page').classList.toggle('vizzu-page-sidebar-toggled');
	}

	closeSideBar() {
		document.querySelector('.vizzu-page').classList.remove('vizzu-page-sidebar-toggled');
	}

	loadStaticExample(url) {
		console.log(url);
	}

}




