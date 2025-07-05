// Hamburger menu functionality

/**
 * Initialize hamburger menu functionality
 */
function initHamburgerMenu() {
	const hamburger = document.getElementById("hamburger-menu");
	const mobileMenu = document.getElementById("mobile-menu");

	if (hamburger && mobileMenu) {
		// Toggle menu when hamburger is clicked
		hamburger.addEventListener("click", function () {
			hamburger.classList.toggle("active");
			mobileMenu.classList.toggle("active");

			// Prevent body scroll when menu is open
			if (mobileMenu.classList.contains("active")) {
				disableBodyScroll();
			} else {
				enableBodyScroll();
			}
		});

		// Close menu when clicking outside
		document.addEventListener("click", function (event) {
			if (
				!hamburger.contains(event.target) &&
				!mobileMenu.contains(event.target)
			) {
				hamburger.classList.remove("active");
				mobileMenu.classList.remove("active");
				enableBodyScroll();
			}
		});
	}
}

// Initialize hamburger menu when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM loaded, initializing hamburger menu...");
	initHamburgerMenu();
});

// Make function available globally
if (typeof window !== "undefined") {
	window.initHamburgerMenu = initHamburgerMenu;
}
