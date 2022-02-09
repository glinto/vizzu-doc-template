import ScrollSpy from "./scrollspy.js";

export default class VizzuDocumentation {

	constructor(context) {
		this.context = context;
		this.scrollSpy = new ScrollSpy(this.context);

		if (localStorage.getItem('theme-dark') === 'true') {
			document.documentElement.classList.add('theme-dark');
		}

		document.addEventListener("DOMContentLoaded", (event) => {
			document.querySelector('.action-sidebar-toogle').addEventListener('click', (event) => {
				this.toggleSideBar();
				event.preventDefault();
			});
			document.querySelector('.action-dark-mode-toogle').addEventListener('click', (event) => {
				this.toggleDarkMode();
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
			document.querySelectorAll('.action-static-example').forEach((element) => {
				element.addEventListener('click', (event) => {
					document.querySelector('vizzu-modal').showUrl(event.target.dataset.target, event.target.alt);
				});
			});
			/* Animated thumbnails */
			document.querySelectorAll('.action-animated-example').forEach((element) => {
				element.addEventListener('click', (event) => {
					document.querySelector('vizzu-modal').showUrl(event.target.dataset.target, event.target.dataset.title);
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

	toggleDarkMode() {
		let cl = document.documentElement.classList;
		if (cl.contains('theme-dark')) {
			cl.remove('theme-dark');
			localStorage.removeItem('theme-dark');
		}
		else {
			cl.add('theme-dark');
			localStorage.setItem('theme-dark', 'true');
		}

	}

}


