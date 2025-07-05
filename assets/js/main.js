// Main application file - initializes all modules and handles global events

/**
 * Initialize all application modules
 */
function initializeApp() {
	console.log("Initializing Campora application...");
	
	// Initialize core modules
	try {
		// Initialize utils first
		console.log("Utils functions loaded");
		
		// Initialize Swiper
		if (typeof initAllSwipers === "function") {
			initAllSwipers();
		}
		
		// Initialize image modal
		if (typeof initImageModal === "function") {
			initImageModal();
		}
		
		// Initialize destination filter
		if (typeof initDestinationFilter === "function") {
			initDestinationFilter();
		}
		
		// Initialize booking modal
		if (typeof initBookingModal === "function") {
			initBookingModal();
		}
		
		// Add global event listeners
		addGlobalEventListeners();
		
		console.log("All modules initialized successfully");
	} catch (error) {
		console.error("Error initializing application:", error);
	}
}

/**
 * Add global event listeners
 */
function addGlobalEventListeners() {
	// Close modals with Escape key
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeAllModals();
		}
	});

	// Handle window resize
	window.addEventListener("resize", function () {
		// Close mobile menu on desktop
		if (window.innerWidth > 768) {
			const hamburger = document.getElementById("hamburger-menu");
			const mobileMenu = document.getElementById("mobile-menu");
			if (hamburger && mobileMenu) {
				hamburger.classList.remove("active");
				mobileMenu.classList.remove("active");
				enableBodyScroll();
			}
		}
	});

	// Handle page visibility change
	document.addEventListener("visibilitychange", function () {
		if (document.hidden) {
			// Pause testimonial carousel when page is hidden
			if (typeof stopTestimonialCarousel === 'function') {
				stopTestimonialCarousel();
			}
		} else {
			// Resume testimonial carousel when page is visible
			if (typeof startTestimonialCarousel === 'function') {
				startTestimonialCarousel();
			}
		}
	});
}

/**
 * Close all open modals
 */
function closeAllModals() {
	// Close image modal
	if (typeof closeImageModal === 'function') {
		closeImageModal();
	}

	// Close auth modal
	const authModal = document.getElementById("authModal");
	if (authModal && authModal.classList.contains("active")) {
		authModal.classList.remove("active");
		enableBodyScroll();
	}

	// Close booking modal
	if (typeof closeBookingModal === 'function') {
		closeBookingModal();
	}

	// Close mobile menu
	const hamburger = document.getElementById("hamburger-menu");
	const mobileMenu = document.getElementById("mobile-menu");
	if (hamburger && mobileMenu) {
		hamburger.classList.remove("active");
		mobileMenu.classList.remove("active");
		enableBodyScroll();
	}

	// Close user dropdown
	const userDropdown = document.getElementById("userDropdown");
	if (userDropdown) {
		userDropdown.classList.add("hidden");
	}
}

/**
 * Utility function to check if device is mobile
 * @returns {boolean} - True if mobile device
 */
function isMobileDevice() {
	return window.innerWidth <= 768;
}

/**
 * Utility function to check if device supports touch
 * @returns {boolean} - True if touch device
 */
function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Smooth scroll to element
 * @param {string} elementId - The ID of element to scroll to
 */
function smoothScrollTo(elementId) {
	const element = document.getElementById(elementId);
	if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
}

/**
 * Show loading indicator
 * @param {string} message - Loading message
 */
function showLoading(message = 'Loading...') {
	// Create loading overlay if it doesn't exist
	let loadingOverlay = document.getElementById('loadingOverlay');
	if (!loadingOverlay) {
		loadingOverlay = document.createElement('div');
		loadingOverlay.id = 'loadingOverlay';
		loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
		loadingOverlay.innerHTML = `
			<div class="bg-white p-6 rounded-lg shadow-lg text-center">
				<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#347928] mx-auto mb-4"></div>
				<p class="text-gray-700">${message}</p>
			</div>
		`;
		document.body.appendChild(loadingOverlay);
	}
	loadingOverlay.classList.remove('hidden');
	disableBodyScroll();
}

/**
 * Hide loading indicator
 */
function hideLoading() {
	const loadingOverlay = document.getElementById('loadingOverlay');
	if (loadingOverlay) {
		loadingOverlay.classList.add('hidden');
		enableBodyScroll();
	}
}

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
	const notification = document.createElement('div');
	notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
	
	// Set notification style based on type
	switch (type) {
		case 'success':
			notification.classList.add('bg-green-500', 'text-white');
			break;
		case 'error':
			notification.classList.add('bg-red-500', 'text-white');
			break;
		default:
			notification.classList.add('bg-blue-500', 'text-white');
	}
	
	notification.innerHTML = `
		<div class="flex items-center">
			<span>${message}</span>
			<button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
				<i class="fas fa-times"></i>
			</button>
		</div>
	`;
	
	document.body.appendChild(notification);
	
	// Animate in
	setTimeout(() => {
		notification.classList.remove('translate-x-full');
	}, 100);
	
	// Auto remove after 5 seconds
	setTimeout(() => {
		notification.classList.add('translate-x-full');
		setTimeout(() => {
			if (notification.parentElement) {
				notification.remove();
			}
		}, 300);
	}, 5000);
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
	console.log("DOM fully loaded, initializing app...");
	initializeApp();
});

// Also initialize when window is loaded (fallback)
window.addEventListener("load", function() {
	console.log("Window loaded, ensuring app is initialized...");
	if (!window.camporaAppInitialized) {
		initializeApp();
		window.camporaAppInitialized = true;
	}
});

// Make utility functions available globally
window.CamporaApp = {
	isMobileDevice,
	isTouchDevice,
	smoothScrollTo,
	showLoading,
	hideLoading,
	showNotification,
	closeAllModals
};