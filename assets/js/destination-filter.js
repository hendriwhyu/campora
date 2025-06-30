// Destination filter functionality

/**
 * Initialize destination filter functionality
 */
function initDestinationFilter() {
	const curugBtn = getButtonByText("Curug");
	const gunungBtn = getButtonByText("Gunung");

	// Add click event listeners to filter buttons
	if (curugBtn) {
		curugBtn.addEventListener("click", function () {
			updateFilterButtonStyles(curugBtn, gunungBtn);
			filterDestinations("curug");
		});
	}

	if (gunungBtn) {
		gunungBtn.addEventListener("click", function () {
			updateFilterButtonStyles(gunungBtn, curugBtn);
			filterDestinations("gunung");
		});
	}

	// Initialize with all destinations shown
	filterDestinations("all");
}

/**
 * Update button styles for active/inactive states
 * @param {Element} activeBtn - The button to make active
 * @param {Element} inactiveBtn - The button to make inactive
 */
function updateFilterButtonStyles(activeBtn, inactiveBtn) {
	// Active button styles
	activeBtn.classList.add("bg-white", "text-[#347928]");
	activeBtn.classList.remove(
		"bg-transparent",
		"border",
		"border-solid",
		"border-white",
		"text-white"
	);

	// Inactive button styles
	if (inactiveBtn) {
		inactiveBtn.classList.remove("bg-white", "text-[#347928]");
		inactiveBtn.classList.add(
			"bg-transparent",
			"border",
			"border-solid",
			"border-white",
			"text-white"
		);
	}
}

/**
 * Filter slides based on destination type
 * @param {string} type - The type to filter by ('all', 'curug', 'gunung')
 */
function filterDestinations(type) {
	// Get all slides
	const slides = document.querySelectorAll(".swiper-slide");

	// Loop through each slide
	slides.forEach((slide) => {
		const slideTitle = slide.querySelector("h1");
		if (!slideTitle) return;

		const title = slideTitle.textContent.trim().toLowerCase();

		// Check if it's a Curug or Gunung based on title
		const isCurug = title.includes("curug");
		const isGunung = title.includes("gunung");

		// Show or hide based on selected type
		if (type === "all") {
			slide.style.display = "";
		} else if (type === "curug" && isCurug) {
			slide.style.display = "";
		} else if (type === "gunung" && isGunung) {
			slide.style.display = "";
		} else {
			slide.style.display = "none";
		}
	});

	// Update Swiper to reflect changes
	updateSwiper();
}