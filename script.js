document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.getElementById("hamburger-menu");
	const mobileMenu = document.getElementById("mobile-menu");
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	const closeModal = document.getElementById("closeModal");
	// Ubah selector untuk gambar yang bisa diklik
	const images = document.querySelectorAll(".grid img, .swiper-slide .grid img");

	// Hamburger menu functionality
	if (hamburger && mobileMenu) {
		hamburger.addEventListener("click", function () {
			hamburger.classList.toggle("active");
			mobileMenu.classList.toggle("active");
		});

		// Close menu when clicking outside
		document.addEventListener("click", function (event) {
			if (
				!hamburger.contains(event.target) &&
				!mobileMenu.contains(event.target)
			) {
				hamburger.classList.remove("active");
				mobileMenu.classList.remove("active");
			}
		});
	}

	// Modal functionality
	images.forEach((img) => {
		img.addEventListener("click", function () {
			modal.classList.add("active");
			modalImg.src = this.src;
			modalImg.alt = this.alt;
			document.body.style.overflow = "hidden"; // Prevent scrolling
		});
	});

	// Close modal when clicking close button
	closeModal.addEventListener("click", function () {
		modal.classList.remove("active");
		document.body.style.overflow = "auto"; // Re-enable scrolling
	});

	// Close modal when clicking outside
	modal.addEventListener("click", function (event) {
		if (event.target === modal) {
			modal.classList.remove("active");
			document.body.style.overflow = "auto"; // Re-enable scrolling
		}
	});

	// Close modal with Escape key
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && modal.classList.contains("active")) {
			modal.classList.remove("active");
			document.body.style.overflow = "auto"; // Re-enable scrolling
		}
	});
});
