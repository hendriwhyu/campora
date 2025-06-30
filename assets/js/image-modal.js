// Image modal functionality

/**
 * Initialize image modal functionality
 */
function initImageModal() {
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	const closeModal = document.getElementById("closeModal");
	// Select all clickable images
	const images = document.querySelectorAll(
		".grid img, .swiper-slide .grid img"
	);

	if (!modal || !modalImg || !closeModal) return;

	// Add click event to all images
	images.forEach((img) => {
		img.addEventListener("click", function () {
			modal.classList.add("active");
			modalImg.src = this.src;
			modalImg.alt = this.alt;
			disableBodyScroll();
		});
	});

	// Close modal when clicking close button
	closeModal.addEventListener("click", function () {
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
		if (event.key === "Escape" && modal.classList.contains("active")) {
			closeImageModal();
		}
	});
}

/**
 * Close the image modal
 */
function closeImageModal() {
	const modal = document.getElementById("imageModal");
	if (modal) {
		modal.classList.remove("active");
		enableBodyScroll();
	}
}
