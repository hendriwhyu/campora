// Testimonial carousel functionality

let currentTestimonialIndex = 0;
let testimonialInterval;
let testimonialData = [];

/**
 * Initialize testimonial carousel
 */
function initTestimonialCarousel() {
	// Load testimonial data
	loadTestimonialData();

	// Start auto-play
	startTestimonialCarousel();

	// Add event listeners for navigation
	const prevBtn = document.querySelector(".testimonial-prev");
	const nextBtn = document.querySelector(".testimonial-next");

	if (prevBtn) {
		prevBtn.addEventListener("click", () => {
			prevTestimonial();
		});
	}

	if (nextBtn) {
		nextBtn.addEventListener("click", () => {
			nextTestimonial();
		});
	}

	// Add click events to indicators
	const indicators = document.querySelectorAll(".testimonial-indicator");
	indicators.forEach((indicator, index) => {
		indicator.addEventListener("click", () => {
			goToTestimonial(index);
		});
	});
}

/**
 * Load testimonial data from global variable or fallback
 */
function loadTestimonialData() {
	// Check if testimonialData is available globally
	if (window.testimonialData && Array.isArray(window.testimonialData)) {
		testimonialData = window.testimonialData;
	} else {
		// Fallback data if global data is not available
		testimonialData = [
			{
				name: "Sarah Johnson",
				avatar: "assets/images/avatar1.jpg",
				rating: 5,
				review: "Pengalaman yang luar biasa! Pemandangan alam yang menakjubkan dan pelayanan yang sangat memuaskan."
			},
			{
				name: "Ahmad Rahman",
				avatar: "assets/images/avatar2.jpg",
				rating: 5,
				review: "Trip yang sangat berkesan. Guide yang berpengalaman dan destinasi yang indah sekali."
			},
			{
				name: "Maria Santos",
				avatar: "assets/images/avatar3.jpg",
				rating: 4,
				review: "Sangat direkomendasikan untuk yang suka petualangan alam. Fasilitas lengkap dan aman."
			}
		];
	}

	// Render initial testimonial
	renderTestimonial(currentTestimonialIndex);
	updateTestimonialIndicators();
}

/**
 * Start testimonial auto-play
 */
function startTestimonialCarousel() {
	testimonialInterval = setInterval(() => {
		nextTestimonial();
	}, 5000); // Change every 5 seconds
}

/**
 * Stop testimonial auto-play
 */
function stopTestimonialCarousel() {
	if (testimonialInterval) {
		clearInterval(testimonialInterval);
	}
}

/**
 * Go to next testimonial
 */
function nextTestimonial() {
	currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialData.length;
	renderTestimonial(currentTestimonialIndex);
	updateTestimonialIndicators();
}

/**
 * Go to previous testimonial
 */
function prevTestimonial() {
	currentTestimonialIndex = currentTestimonialIndex === 0 ? testimonialData.length - 1 : currentTestimonialIndex - 1;
	renderTestimonial(currentTestimonialIndex);
	updateTestimonialIndicators();
}

/**
 * Go to specific testimonial
 * @param {number} index - The index of testimonial to show
 */
function goToTestimonial(index) {
	currentTestimonialIndex = index;
	renderTestimonial(currentTestimonialIndex);
	updateTestimonialIndicators();
}

/**
 * Render testimonial at given index
 * @param {number} index - The index of testimonial to render
 */
function renderTestimonial(index) {
	if (!testimonialData[index]) return;

	const testimonial = testimonialData[index];
	const container = document.querySelector(".testimonial-content");

	if (container) {
		container.innerHTML = `
			<div class="testimonial-card bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
				<div class="flex items-center mb-4">
					<img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-12 h-12 rounded-full mr-4 object-cover">
					<div>
						<h4 class="font-semibold text-gray-800">${testimonial.name}</h4>
						<div class="flex text-yellow-400">
							${generateStars(testimonial.rating)}
						</div>
					</div>
				</div>
				<p class="text-gray-600 italic">"${testimonial.review}"</p>
			</div>
		`;
	}
}

/**
 * Generate star rating HTML
 * @param {number} rating - The rating number (1-5)
 * @returns {string} - HTML string for stars
 */
function generateStars(rating) {
	let stars = "";
	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			stars += '<i class="fas fa-star"></i>';
		} else {
			stars += '<i class="far fa-star"></i>';
		}
	}
	return stars;
}

/**
 * Update testimonial indicators
 */
function updateTestimonialIndicators() {
	const indicators = document.querySelectorAll(".testimonial-indicator");
	indicators.forEach((indicator, index) => {
		if (index === currentTestimonialIndex) {
			indicator.classList.add("active");
		} else {
			indicator.classList.remove("active");
		}
	});
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initTestimonialCarousel);

// Pause carousel when page is not visible
document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		stopTestimonialCarousel();
	} else {
		startTestimonialCarousel();
	}
});