document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.getElementById("hamburger-menu");
	const mobileMenu = document.getElementById("mobile-menu");
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	const closeModal = document.getElementById("closeModal");
	// Ubah selector untuk gambar yang bisa diklik
	const images = document.querySelectorAll(".grid img, .swiper-slide .grid img");

	// Custom selector function since :contains is not standard
	function getButtonByText(text) {
		const buttons = document.querySelectorAll('button');
		for (let button of buttons) {
			if (button.textContent.trim() === text) {
				return button;
			}
		}
		return null;
	}

	const curugBtn = getButtonByText('Curug');
	const gunungBtn = getButtonByText('Gunung');

	// Function to filter slides based on type
	function filterDestinations(type) {
		// Get all slides
		const slides = document.querySelectorAll('.swiper-slide');
		
		// Loop through each slide
		slides.forEach(slide => {
			const slideTitle = slide.querySelector('h1');
			if (!slideTitle) return;
			
			const title = slideTitle.textContent.trim().toLowerCase();
			
			// Check if it's a Curug or Gunung based on title
			const isCurug = title.includes('curug');
			const isGunung = title.includes('gunung');
			
			// Show or hide based on selected type
			if (type === 'all') {
				slide.style.display = '';
			} else if (type === 'curug' && isCurug) {
				slide.style.display = '';
			} else if (type === 'gunung' && isGunung) {
				slide.style.display = '';
			} else {
				slide.style.display = 'none';
			}
		});
		
		// Update Swiper to reflect changes
		if (window.swiper) {
			window.swiper.update();
			window.swiper.updateSlides();
		}
	}

	// Add click event listeners to the buttons
	if (curugBtn) {
		curugBtn.addEventListener('click', function() {
			// Update active state for buttons
			curugBtn.classList.add('bg-white', 'text-[#347928]');
			curugBtn.classList.remove('bg-transparent', 'border', 'border-solid', 'border-white', 'text-white');
			
			if (gunungBtn) {
				gunungBtn.classList.remove('bg-white', 'text-[#347928]');
				gunungBtn.classList.add('bg-transparent', 'border', 'border-solid', 'border-white', 'text-white');
			}
			
			// Filter destinations
			filterDestinations('curug');
		});
	}

	if (gunungBtn) {
		gunungBtn.addEventListener('click', function() {
			// Update active state for buttons
			gunungBtn.classList.add('bg-white', 'text-[#347928]');
			gunungBtn.classList.remove('bg-transparent', 'border', 'border-solid', 'border-white', 'text-white');
			
			if (curugBtn) {
				curugBtn.classList.remove('bg-white', 'text-[#347928]');
				curugBtn.classList.add('bg-transparent', 'border', 'border-solid', 'border-white', 'text-white');
			}
			
			// Filter destinations
			filterDestinations('gunung');
		});
	}

	// Initialize with all destinations shown
	filterDestinations('all');

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
