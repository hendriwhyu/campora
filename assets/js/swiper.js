// Global swiper instances
let destinationSwiper = null;
let testimonialSwiper = null;

// Inisialisasi Destination Swiper dan menyimpannya ke variabel global
function initDestinationSwiper() {
	if (destinationSwiper) {
		destinationSwiper.destroy(true, true);
	}

	destinationSwiper = new Swiper(".destination-swiper", {
		// Slides per view
		slidesPerView: 1,
		spaceBetween: 20,

		// Pagination
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		},

		// Navigation arrows
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		// Scrollbar
		scrollbar: {
			el: ".swiper-scrollbar",
			hide: true,
		},

		// Aktifkan observer untuk memperbarui Swiper saat elemen diubah
		observer: true,
		observeParents: true,
		observeSlideChildren: true,

		// Auto height untuk slide yang berbeda tinggi
		autoHeight: true,

		// Loop untuk navigasi yang seamless - disabled untuk filtering
		loop: false,

		// AllowTouchMove untuk mobile
		allowTouchMove: true,

		// Keyboard control
		keyboard: {
			enabled: true,
		},

		// Watch slides progress
		watchSlidesProgress: true,

		// Responsive breakpoints
		breakpoints: {
			640: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 1,
				spaceBetween: 40,
			},
		},

		// Event callbacks
		on: {
			init: function () {
				console.log("Destination Swiper initialized");
			},
			slideChange: function () {
				console.log("Slide changed to:", this.activeIndex);
			},
		},
	});

	// Store globally for access from other modules
	window.destinationSwiper = destinationSwiper;
}

// Inisialisasi Testimonial Swiper
function initTestimonialSwiper() {
	if (testimonialSwiper) {
		testimonialSwiper.destroy(true, true);
	}

	testimonialSwiper = new Swiper(".testimonial-swiper", {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		autoHeight: true,
		loop: true,
	});

	// Store globally for access from other modules
	window.testimonialSwiper = testimonialSwiper;
}

// Initialize all swipers
function initAllSwipers() {
	initDestinationSwiper();
	initTestimonialSwiper();
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
	initAllSwipers();
});

// Make functions available globally
window.initDestinationSwiper = initDestinationSwiper;
window.initTestimonialSwiper = initTestimonialSwiper;
window.initAllSwipers = initAllSwipers;
