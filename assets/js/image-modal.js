// Image modal functionality

/**
 * Initialize image modal functionality
 */
function initImageModal() {
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	const closeModal = document.getElementById("closeModal");

	if (!modal || !modalImg || !closeModal) {
		console.error("Image modal elements not found");
		return;
	}

	// Close modal when clicking close button
	closeModal.addEventListener("click", function (e) {
		e.preventDefault();
		e.stopPropagation();
		closeImageModal();
	});

	// Close modal when clicking outside the image
	modal.addEventListener("click", function (event) {
		if (event.target === modal) {
			closeImageModal();
		}
	});

	// Close modal with Escape key
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && isImageModalOpen()) {
			closeImageModal();
		}
	});

	console.log("Image modal initialized successfully");
}

/**
 * Check if image modal is open
 * @returns {boolean} - True if modal is open
 */
function isImageModalOpen() {
	const modal = document.getElementById("imageModal");
	return modal && (!modal.classList.contains("hidden") || modal.classList.contains("active"));
}

/**
 * Open image modal with specific image
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 */
function openImageModal(src, alt) {
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	
	if (!modal || !modalImg) {
		console.error("Image modal elements not found");
		return;
	}

	// Set image source and alt
	modalImg.src = src;
	modalImg.alt = alt || "";

	// Show modal using both methods for compatibility
	modal.classList.remove("hidden");
	modal.classList.add("flex", "active");
	modal.style.display = "flex";

	// Disable body scroll
	if (typeof disableBodyScroll === "function") {
		disableBodyScroll();
	} else {
		document.body.style.overflow = "hidden";
	}

	console.log("Image modal opened with image:", src);
}

/**
 * Close the image modal
 */
function closeImageModal() {
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	
	if (modal) {
		// Hide modal using both methods for compatibility
		modal.classList.add("hidden");
		modal.classList.remove("flex", "active");
		modal.style.display = "none";
		
		// Clear image source to prevent issues
		if (modalImg) {
			modalImg.src = "";
			modalImg.alt = "";
		}

		// Enable body scroll
		if (typeof enableBodyScroll === "function") {
			enableBodyScroll();
		} else {
			document.body.style.overflow = "";
		}

		console.log("Image modal closed");
	}
}

/**
 * Add event listeners to images for modal functionality
 * This function can be called by other modules to add modal functionality to images
 */
function addImageModalEventListeners() {
	// Select all clickable images
	const images = document.querySelectorAll(
		".grid img, .swiper-slide .grid img, .clickable-image"
	);

	images.forEach((img) => {
		// Remove existing listeners to prevent duplicates
		img.removeEventListener("click", handleImageModalClick);
		img.addEventListener("click", handleImageModalClick);
		
		// Add cursor pointer style
		img.style.cursor = "pointer";
	});
	
	console.log("Added image modal listeners to", images.length, "images");
}

/**
 * Handle image click for modal
 * @param {Event} e - Click event
 */
function handleImageModalClick(e) {
	e.preventDefault();
	e.stopPropagation();

	const src = this.src;
	const alt = this.alt;
	
	openImageModal(src, alt);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
	console.log("DOM loaded, initializing image modal...");
	initImageModal();
	addImageModalEventListeners();
});

// Make functions available globally
if (typeof window !== 'undefined') {
	window.ImageModal = {
		init: initImageModal,
		open: openImageModal,
		close: closeImageModal,
		addEventListeners: addImageModalEventListeners
	};
	
	// Make individual functions available globally
	window.openImageModal = openImageModal;
	window.closeImageModal = closeImageModal;
	window.addImageModalEventListeners = addImageModalEventListeners;
}
