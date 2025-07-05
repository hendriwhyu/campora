// Utility functions for common operations

/**
 * Find button element by its text content
 * @param {string} text - The text content to search for
 * @returns {Element|null} - The button element or null if not found
 */
function getButtonByText(text) {
	const buttons = document.querySelectorAll("button");
	for (let button of buttons) {
		if (button.textContent.trim() === text) {
			return button;
		}
	}
	return null;
}

/**
 * Add multiple CSS classes to an element
 * @param {Element} element - The DOM element
 * @param {string[]} classes - Array of class names to add
 */
function addClasses(element, classes) {
	element.classList.add(...classes);
}

/**
 * Remove multiple CSS classes from an element
 * @param {Element} element - The DOM element
 * @param {string[]} classes - Array of class names to remove
 */
function removeClasses(element, classes) {
	element.classList.remove(...classes);
}

/**
 * Toggle multiple CSS classes on an element
 * @param {Element} element - The DOM element
 * @param {string[]} classes - Array of class names to toggle
 */
function toggleClasses(element, classes) {
	classes.forEach(className => {
		element.classList.toggle(className);
	});
}

/**
 * Disable body scroll
 */
function disableBodyScroll() {
	document.body.style.overflow = "hidden";
}

/**
 * Enable body scroll
 */
function enableBodyScroll() {
	document.body.style.overflow = "auto";
}

/**
 * Check if element is visible
 * @param {Element} element - The DOM element to check
 * @returns {boolean} - True if element is visible
 */
function isElementVisible(element) {
	return !element.classList.contains("hidden");
}

/**
 * Show element by removing hidden class
 * @param {Element} element - The DOM element to show
 */
function showElement(element) {
	element.classList.remove("hidden");
}

/**
 * Hide element by adding hidden class
 * @param {Element} element - The DOM element to hide
 */
function hideElement(element) {
	element.classList.add("hidden");
}

/**
 * Update Swiper instance if available
 */
function updateSwiper() {
	if (window.destinationSwiper) {
		window.destinationSwiper.update();
		window.destinationSwiper.updateSlides();
		window.destinationSwiper.updateProgress();
		window.destinationSwiper.updateSlidesClasses();
	}
	
	if (window.testimonialSwiper) {
		window.testimonialSwiper.update();
		window.testimonialSwiper.updateSlides();
	}
}

/**
 * Update destination swiper specifically
 */
function updateDestinationSwiper() {
	if (window.destinationSwiper) {
		window.destinationSwiper.update();
		window.destinationSwiper.updateSlides();
		window.destinationSwiper.updateProgress();
		window.destinationSwiper.updateSlidesClasses();
	}
}