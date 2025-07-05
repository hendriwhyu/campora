// Booking modal functionality

let selectedDestination = null;
let bookingModalData = {
	name: "",
	whatsapp: "",
	package: "",
	date: "",
	participants: 1,
	totalPrice: 0,
};

/**
 * Initialize booking modal functionality
 */
function initBookingModal() {
	console.log("Initializing booking modal...");

	// Check if modal exists in DOM
	const modal = document.getElementById("bookingModal");
	if (!modal) {
		console.error("Booking modal element not found in DOM");
		return;
	}

	// Use event delegation to handle dynamically added booking buttons
	document.addEventListener("click", function (e) {
		// Check if clicked element has data-booking-btn attribute
		const bookingBtn =
			e.target.closest("[data-booking-btn]") ||
			(e.target.hasAttribute("data-booking-btn") ? e.target : null);

		if (bookingBtn) {
			e.preventDefault();
			e.stopPropagation();

			console.log("Booking button clicked:", bookingBtn);

			const destinationData = getDestinationData(bookingBtn);
			console.log("Destination data:", destinationData);

			openBookingModal(destinationData);
		}
	});

	// Close modal button
	const closeBookingModalBtn = document.getElementById("closeBookingModal");
	if (closeBookingModalBtn) {
		closeBookingModalBtn.addEventListener("click", function (e) {
			e.preventDefault();
			closeBookingModal();
		});
	}

	// Add event listeners for modal interactions
	addModalEventListeners();

	console.log("Booking modal initialized successfully");
}

/**
 * Find element containing specific text
 * @param {HTMLElement} parent - Parent element to search in
 * @param {string} text - Text to search for
 * @returns {HTMLElement|null} - Found element or null
 */
function findElementWithText(parent, text) {
	const elements = parent.querySelectorAll("*");
	for (let element of elements) {
		if (element.textContent && element.textContent.includes(text)) {
			return element;
		}
	}
	return null;
}

/**
 * Extract destination data from booking button context
 * @param {HTMLElement} button - The booking button element
 * @returns {Object} - Destination data
 */
function getDestinationData(button) {
	console.log("Extracting destination data from button:", button);

	const slide = button.closest(".swiper-slide");
	if (!slide) {
		console.warn("No swiper slide found for booking button");
		return getDefaultDestinationData();
	}

	const titleElement = slide.querySelector("h1");
	const priceElement =
		findElementWithText(slide, "Rp") ||
		findElementWithText(slide, "Mulai dari");
	const locationButtons = slide.querySelectorAll("button");
	let locationElement = null;

	// Find location button (usually the second button in the top area)
	for (let btn of locationButtons) {
		const text = btn.textContent.trim();
		if (text !== "Regular" && text !== "Booking Sekarang" && text.length > 2) {
			locationElement = btn;
			break;
		}
	}

	const destinationName = titleElement
		? titleElement.textContent.trim()
		: "Destinasi";
	const location = locationElement
		? locationElement.textContent.trim()
		: "Indonesia";

	// Extract price from text
	let price = 185000; // Default price
	if (priceElement) {
		const priceText = priceElement.textContent;
		const extractedPrice = extractPrice(priceText);
		if (extractedPrice > 0) {
			price = extractedPrice;
		}
	} else {
		// Try to determine price based on destination name
		const nameLower = destinationName.toLowerCase();
		if (nameLower.includes("slamet")) {
			price = 250000;
		} else if (nameLower.includes("bayan")) {
			price = 200000;
		} else if (nameLower.includes("gogor")) {
			price = 185000;
		}
	}

	const destinationData = {
		name: destinationName,
		price: price,
		location: location,
		type: getCurrentDestinationType(),
	};

	console.log("Extracted destination data:", destinationData);
	return destinationData;
}

/**
 * Get default destination data when extraction fails
 * @returns {Object} - Default destination data
 */
function getDefaultDestinationData() {
	return {
		name: "Curug Gogor",
		price: 185000,
		location: "Purbalingga",
		type: "Curug",
	};
}

/**
 * Get current destination type (Curug or Gunung)
 * @returns {string} - Current destination type
 */
function getCurrentDestinationType() {
	const curugBtn = document.querySelector(
		'button[class*="bg-white"][class*="text-[#347928]"]'
	);
	return curugBtn && curugBtn.textContent.includes("Curug")
		? "Curug"
		: "Gunung";
}

/**
 * Extract price from text
 * @param {string} priceText - Text containing price
 * @returns {number} - Extracted price
 */
function extractPrice(priceText) {
	if (!priceText) return 185000;

	// Look for patterns like "Rp185K", "Rp185.000", "185K", "185000"
	const patterns = [
		/Rp\s*(\d+)[kK]/i, // Rp185K
		/Rp\s*([\d,]+)/i, // Rp185,000
		/(\d+)[kK]/, // 185K
		/(\d+)/, // 185000
	];

	for (let pattern of patterns) {
		const match = priceText.match(pattern);
		if (match) {
			let price = parseInt(match[1].replace(/,/g, ""));
			// If price is in K format, multiply by 1000
			if (priceText.toLowerCase().includes("k")) {
				price *= 1000;
			}
			return price;
		}
	}

	return 185000; // Default price
}

/**
 * Open booking modal with destination data
 * @param {Object} destinationData - Data about the selected destination
 */
function openBookingModal(destinationData) {
	console.log("Opening booking modal with data:", destinationData);

	selectedDestination = destinationData;

	// Get modal element
	const modal = document.getElementById("bookingModal");
	if (!modal) {
		console.error("Booking modal element not found");
		return;
	}

	console.log("Modal element found:", modal);

	// Update modal content with destination data
	if (destinationData) {
		updateModalContent(destinationData);
	}

	// Show modal with proper classes
	modal.classList.remove("hidden");
	modal.classList.add("flex");
	modal.style.display = "flex";
	modal.style.zIndex = "9999";

	// Add body class to prevent scrolling
	document.body.style.overflow = "hidden";

	console.log("Booking modal should now be visible");

	// Force a reflow to ensure modal is visible
	modal.offsetHeight;

	// Disable body scroll using utility function if available
	if (typeof disableBodyScroll === "function") {
		disableBodyScroll();
	}
}
/**
 * Update modal content with destination data
 * @param {Object} destinationData - Data about the selected destination
 */
function updateModalContent(destinationData) {
	if (!destinationData) {
		console.warn("No destination data provided for modal");
		return;
	}

	console.log("Updating modal content with:", destinationData);

	// Update package dropdown to show current destination
	const packageSelect = document.getElementById("bookingPackage");
	if (packageSelect && destinationData.name) {
		const packageValue = `${destinationData.type.toLowerCase()}-${destinationData.name
			.toLowerCase()
			.replace(/\s+/g, "-")}-${destinationData.price}`;
		const packageText = `${destinationData.type} - ${
			destinationData.name
		} - Rp${destinationData.price.toLocaleString("id-ID")}`;

		// Clear existing custom options and add new one
		const existingCustomOptions = packageSelect.querySelectorAll(
			'option[data-custom="true"]'
		);
		existingCustomOptions.forEach((option) => option.remove());

		// Add the current destination option
		const option = document.createElement("option");
		option.value = packageValue;
		option.textContent = packageText;
		option.setAttribute("data-custom", "true");
		option.setAttribute("selected", "selected");
		packageSelect.appendChild(option);

		// Select the current destination
		packageSelect.value = packageValue;

		// Update booking data
		bookingModalData.package = packageValue;
		bookingModalData.totalPrice = destinationData.price;

		// Set default participants to 1
		const participantsSelect = document.getElementById("bookingParticipants");
		if (participantsSelect) {
			participantsSelect.value = 1;
			bookingModalData.participants = 1;
		}

		// Update total price display
		updateTotalPrice();
	}
}

/**
 * Add event listeners for modal interactions
 */
function addModalEventListeners() {
	// Close modal when clicking outside
	document.addEventListener("click", (e) => {
		if (e.target.id === "bookingModal") {
			closeBookingModal();
		}
	});

	// Cancel booking button
	document.addEventListener("click", (e) => {
		if (e.target.id === "cancelBooking") {
			e.preventDefault();
			closeBookingModal();
		}
	});

	// Escape key to close modal
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			const modal = document.getElementById("bookingModal");
			if (modal && !modal.classList.contains("hidden")) {
				closeBookingModal();
			}
		}
	});

	// Form submission
	document.addEventListener("submit", (e) => {
		if (e.target.id === "bookingForm") {
			e.preventDefault();
			handleBookingSubmission();
		}
	});

	// Form field changes
	document.addEventListener("change", (e) => {
		if (e.target.closest("#bookingForm")) {
			handleFormFieldChange(e.target);
		}
	});

	// Input events for real-time updates
	document.addEventListener("input", (e) => {
		if (e.target.closest("#bookingForm")) {
			handleFormFieldChange(e.target);
		}
	});
}

/**
 * Handle form field changes
 * @param {HTMLElement} field - The changed form field
 */
function handleFormFieldChange(field) {
	const fieldName = field.name;
	const fieldValue = field.value;

	// Update booking data
	if (fieldName in bookingModalData) {
		bookingModalData[fieldName] = fieldValue;
	}

	// Special handling for package and participants to update total price
	if (fieldName === "package" || fieldName === "participants") {
		updateTotalPrice();
	}

	// Format WhatsApp number
	if (fieldName === "whatsapp") {
		formatWhatsAppNumber(field);
	}
}

/**
 * Format WhatsApp number input
 * @param {HTMLElement} field - WhatsApp input field
 */
function formatWhatsAppNumber(field) {
	let value = field.value.replace(/\D/g, ""); // Remove non-digits

	// Add country code if not present
	if (value.length > 0 && !value.startsWith("62")) {
		if (value.startsWith("0")) {
			value = "62" + value.substring(1);
		} else {
			value = "62" + value;
		}
	}

	field.value = value;
	bookingModalData.whatsapp = value;
}

/**
 * Update total price based on package and participants
 */
function updateTotalPrice() {
	const packageSelect = document.getElementById("bookingPackage");
	const participantsSelect = document.getElementById("bookingParticipants");
	const totalPriceElement = document.getElementById("totalPrice");

	if (!packageSelect || !participantsSelect || !totalPriceElement) return;

	const packageValue = packageSelect.value;
	const participants = parseInt(participantsSelect.value) || 1;

	let basePrice = 0;
	if (packageValue) {
		// Extract price from package value
		const priceMatch = packageValue.match(/(\d+)$/);
		if (priceMatch) {
			basePrice = parseInt(priceMatch[1]);
		}
	}

	const totalPrice = basePrice * participants;
	bookingModalData.totalPrice = totalPrice;

	// Update display
	totalPriceElement.textContent = `Rp${totalPrice.toLocaleString("id-ID")}`;
}

/**
 * Handle booking form submission
 */
function handleBookingSubmission() {
	// Validate form
	if (!validateBookingForm()) {
		return;
	}

	// Collect form data
	const formData = collectFormData();

	// Process booking (simulate payment)
	processBooking(formData);
}

/**
 * Validate booking form
 * @returns {boolean} - Whether form is valid
 */
function validateBookingForm() {
	const requiredFields = [
		"bookingName",
		"bookingWhatsapp",
		"bookingPackage",
		"bookingDate",
		"bookingParticipants",
	];
	let isValid = true;

	requiredFields.forEach((fieldId) => {
		const field = document.getElementById(fieldId);
		if (field && !field.value.trim()) {
			field.classList.add("border-red-500");
			isValid = false;
		} else if (field) {
			field.classList.remove("border-red-500");
		}
	});

	// Validate WhatsApp number
	const whatsappField = document.getElementById("bookingWhatsapp");
	if (whatsappField && whatsappField.value.length < 10) {
		whatsappField.classList.add("border-red-500");
		isValid = false;
	}

	// Validate date (must be future date)
	const dateField = document.getElementById("bookingDate");
	if (dateField && dateField.value) {
		const selectedDate = new Date(dateField.value);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) {
			dateField.classList.add("border-red-500");
			isValid = false;
		}
	}

	if (!isValid) {
		// Show error message
		showNotification("Mohon lengkapi semua field yang diperlukan", "error");
	}

	return isValid;
}

/**
 * Collect form data
 * @returns {Object} - Form data object
 */
function collectFormData() {
	return {
		name: document.getElementById("bookingName").value.trim(),
		whatsapp: document.getElementById("bookingWhatsapp").value.trim(),
		package: document.getElementById("bookingPackage").value,
		date: document.getElementById("bookingDate").value,
		participants: parseInt(
			document.getElementById("bookingParticipants").value
		),
		totalPrice: bookingModalData.totalPrice,
		destination: selectedDestination,
	};
}

/**
 * Process booking (simulate payment flow)
 * @param {Object} formData - Booking form data
 */
function processBooking(formData) {
	// Show loading state
	const submitButton = document.getElementById("confirmBooking");
	const originalText = submitButton.textContent;
	submitButton.textContent = "Memproses...";
	submitButton.disabled = true;

	// Simulate API call
	setTimeout(() => {
		// Create WhatsApp message
		const whatsappMessage = createWhatsAppMessage(formData);

		// Open WhatsApp
		const whatsappUrl = `https://wa.me/${
			formData.whatsapp
		}?text=${encodeURIComponent(whatsappMessage)}`;
		window.open(whatsappUrl, "_blank");

		// Show success message
		showNotification(
			"Booking berhasil! Anda akan diarahkan ke WhatsApp untuk konfirmasi pembayaran.",
			"success"
		);

		// Close modal
		closeBookingModal();

		// Reset button
		submitButton.textContent = originalText;
		submitButton.disabled = false;
	}, 2000);
}

/**
 * Create WhatsApp message for booking
 * @param {Object} formData - Booking form data
 * @returns {string} - WhatsApp message
 */
function createWhatsAppMessage(formData) {
	const packageInfo = formData.package.split("-");
	const packageName = packageInfo.slice(0, -1).join(" ").replace(/-/g, " ");

	return `Halo Anak Alam! 🏔️

Saya ingin melakukan booking untuk:

👤 Nama: ${formData.name}
📱 WhatsApp: ${formData.whatsapp}
🎯 Paket: ${packageName}
📅 Tanggal: ${new Date(formData.date).toLocaleDateString("id-ID", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	})}
👥 Jumlah Partisipan: ${formData.participants} orang
💰 Total Pembayaran: Rp${formData.totalPrice.toLocaleString("id-ID")}

Mohon konfirmasi ketersediaan dan informasi pembayaran. Terima kasih! 🙏`;
}

/**
 * Close booking modal
 */
function closeBookingModal() {
	console.log("Closing booking modal");

	const modal = document.getElementById("bookingModal");

	if (modal) {
		modal.classList.add("hidden");
		modal.classList.remove("flex");
		modal.style.display = "none";

		// Reset form
		const form = document.getElementById("bookingForm");
		if (form) {
			form.reset();
		}

		// Reset booking data
		bookingModalData = {
			name: "",
			whatsapp: "",
			package: "",
			date: "",
			participants: 1,
			totalPrice: 0,
		};

		selectedDestination = null;

		// Enable body scroll
		document.body.style.overflow = "";

		// Enable body scroll using utility function if available
		if (typeof enableBodyScroll === "function") {
			enableBodyScroll();
		}

		console.log("Booking modal closed successfully");
	}
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = "info") {
	// Use existing notification system if available
	if (window.CamporaApp && window.CamporaApp.showNotification) {
		window.CamporaApp.showNotification(message, type);
		return;
	}

	// Fallback notification
	const notification = document.createElement("div");
	notification.className = `fixed top-4 right-4 z-400 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full ${
		type === "success"
			? "bg-green-500"
			: type === "error"
			? "bg-red-500"
			: "bg-blue-500"
	}`;
	notification.textContent = message;

	document.body.appendChild(notification);

	// Animate in
	setTimeout(() => {
		notification.classList.remove("translate-x-full");
	}, 10);

	// Remove after 5 seconds
	setTimeout(() => {
		notification.classList.add("translate-x-full");
		setTimeout(() => {
			if (notification.parentNode) {
				notification.parentNode.removeChild(notification);
			}
		}, 300);
	}, 5000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM loaded, initializing booking modal...");
	initBookingModal();
});

// Also initialize when window is loaded (fallback)
window.addEventListener("load", function () {
	console.log("Window loaded, ensuring booking modal is initialized...");
	if (!window.bookingModalInitialized) {
		initBookingModal();
		window.bookingModalInitialized = true;
	}
});

// Export functions for global access
if (typeof window !== "undefined") {
	window.BookingModal = {
		init: initBookingModal,
		open: openBookingModal,
		close: closeBookingModal,
		showNotification: showNotification,
	};

	// Make individual functions available globally
	window.openBookingModal = openBookingModal;
	window.closeBookingModal = closeBookingModal;
	window.initBookingModal = initBookingModal;
}
