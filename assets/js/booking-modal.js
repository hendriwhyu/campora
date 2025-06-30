// Booking modal functionality

let selectedDestination = null;
let bookingModalData = {
    name: '',
    whatsapp: '',
    package: '',
    date: '',
    participants: 1,
    totalPrice: 0
};

/**
 * Initialize booking modal functionality
 */
function initBookingModal() {
    // Add event listeners to all booking buttons
    const bookingButtons = document.querySelectorAll('[data-booking-btn]');
    bookingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const destinationData = getDestinationData(button);
            openBookingModal(destinationData);
        });
    });

    const closeBookingModalType = document.getElementById("closeBookingModal");

    if (closeBookingModalType) {
		closeBookingModalType.addEventListener("click", closeBookingModal);
	}

    // Add event listeners for modal interactions
    addModalEventListeners();
}

/**
 * Extract destination data from booking button context
 * @param {HTMLElement} button - The booking button element
 * @returns {Object} - Destination data
 */
function getDestinationData(button) {
    const slide = button.closest('.swiper-slide');
    if (!slide) return null;

    const titleElement = slide.querySelector('h1');
    const priceElement = slide.querySelector('[class*="Rp"]');
    const locationElement = slide.querySelector('button:last-of-type');
    
    return {
        name: titleElement ? titleElement.textContent.trim() : 'Destinasi',
        price: extractPrice(priceElement ? priceElement.textContent : '185000'),
        location: locationElement ? locationElement.textContent.trim() : 'Indonesia',
        type: getCurrentDestinationType()
    };
}

/**
 * Get current destination type (Curug or Gunung)
 * @returns {string} - Current destination type
 */
function getCurrentDestinationType() {
    const curugBtn = document.querySelector('button[class*="bg-white"][class*="text-[#347928]"]');
    return curugBtn && curugBtn.textContent.includes('Curug') ? 'Curug' : 'Gunung';
}

/**
 * Extract price from text
 * @param {string} priceText - Text containing price
 * @returns {number} - Extracted price
 */
function extractPrice(priceText) {
    const match = priceText.match(/Rp([\d,]+)/i);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''));
    }
    return 185000; // Default price
}

/**
 * Open booking modal with destination data
 * @param {Object} destinationData - Data about the selected destination
 */
function openBookingModal(destinationData) {
    selectedDestination = destinationData;
    
    // Create modal if it doesn't exist
    if (!document.getElementById('bookingModal')) {
        createBookingModal();
    }
    
    // Update modal content with destination data
    updateModalContent(destinationData);
    
    // Show modal
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Disable body scroll
    if (window.CamporaApp && window.CamporaApp.disableBodyScroll) {
        window.CamporaApp.disableBodyScroll();
    }
}
/**
 * Update modal content with destination data
 * @param {Object} destinationData - Data about the selected destination
 */
function updateModalContent(destinationData) {
    if (!destinationData) return;
    
    // Update package dropdown to show current destination
    const packageSelect = document.getElementById('bookingPackage');
    if (packageSelect && destinationData.name) {
        const packageValue = `${destinationData.type.toLowerCase()}-${destinationData.name.toLowerCase().replace(/\s+/g, '-')}-${destinationData.price}`;
        const packageText = `${destinationData.type} - ${destinationData.name} - Rp${destinationData.price.toLocaleString('id-ID')}`;
        
        // Add or update the option for current destination
        let existingOption = packageSelect.querySelector(`option[value="${packageValue}"]`);
        if (!existingOption) {
            const option = document.createElement('option');
            option.value = packageValue;
            option.textContent = packageText;
            packageSelect.appendChild(option);
        }
        
        // Select the current destination
        packageSelect.value = packageValue;
        
        // Update booking data
        bookingModalData.package = packageValue;
        bookingModalData.totalPrice = destinationData.price;
        
        // Update total price display
        updateTotalPrice();
    }
}

/**
 * Add event listeners for modal interactions
 */
function addModalEventListeners() {
    // Close modal events
    document.addEventListener('click', (e) => {
        if (e.target.id === 'closeBookingModal' || e.target.id === 'cancelBooking') {
            closeBookingModal();
        }
        
        // Close modal when clicking outside
        if (e.target.id === 'bookingModal') {
            closeBookingModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('bookingModal') && !document.getElementById('bookingModal').classList.contains('hidden')) {
            closeBookingModal();
        }
    });
    
    // Form submission
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'bookingForm') {
            e.preventDefault();
            handleBookingSubmission();
        }
    });
    
    // Form field changes
    document.addEventListener('change', (e) => {
        if (e.target.closest('#bookingForm')) {
            handleFormFieldChange(e.target);
        }
    });
    
    // Input events for real-time updates
    document.addEventListener('input', (e) => {
        if (e.target.closest('#bookingForm')) {
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
    if (fieldName === 'package' || fieldName === 'participants') {
        updateTotalPrice();
    }
    
    // Format WhatsApp number
    if (fieldName === 'whatsapp') {
        formatWhatsAppNumber(field);
    }
}

/**
 * Format WhatsApp number input
 * @param {HTMLElement} field - WhatsApp input field
 */
function formatWhatsAppNumber(field) {
    let value = field.value.replace(/\D/g, ''); // Remove non-digits
    
    // Add country code if not present
    if (value.length > 0 && !value.startsWith('62')) {
        if (value.startsWith('0')) {
            value = '62' + value.substring(1);
        } else {
            value = '62' + value;
        }
    }
    
    field.value = value;
    bookingModalData.whatsapp = value;
}

/**
 * Update total price based on package and participants
 */
function updateTotalPrice() {
    const packageSelect = document.getElementById('bookingPackage');
    const participantsSelect = document.getElementById('bookingParticipants');
    const totalPriceElement = document.getElementById('totalPrice');
    
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
    totalPriceElement.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;
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
    const requiredFields = ['bookingName', 'bookingWhatsapp', 'bookingPackage', 'bookingDate', 'bookingParticipants'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else if (field) {
            field.classList.remove('border-red-500');
        }
    });
    
    // Validate WhatsApp number
    const whatsappField = document.getElementById('bookingWhatsapp');
    if (whatsappField && whatsappField.value.length < 10) {
        whatsappField.classList.add('border-red-500');
        isValid = false;
    }
    
    // Validate date (must be future date)
    const dateField = document.getElementById('bookingDate');
    if (dateField && dateField.value) {
        const selectedDate = new Date(dateField.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            dateField.classList.add('border-red-500');
            isValid = false;
        }
    }
    
    if (!isValid) {
        // Show error message
        showNotification('Mohon lengkapi semua field yang diperlukan', 'error');
    }
    
    return isValid;
}

/**
 * Collect form data
 * @returns {Object} - Form data object
 */
function collectFormData() {
    return {
        name: document.getElementById('bookingName').value.trim(),
        whatsapp: document.getElementById('bookingWhatsapp').value.trim(),
        package: document.getElementById('bookingPackage').value,
        date: document.getElementById('bookingDate').value,
        participants: parseInt(document.getElementById('bookingParticipants').value),
        totalPrice: bookingModalData.totalPrice,
        destination: selectedDestination
    };
}

/**
 * Process booking (simulate payment flow)
 * @param {Object} formData - Booking form data
 */
function processBooking(formData) {
    // Show loading state
    const submitButton = document.getElementById('confirmBooking');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Memproses...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Create WhatsApp message
        const whatsappMessage = createWhatsAppMessage(formData);
        
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/${formData.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showNotification('Booking berhasil! Anda akan diarahkan ke WhatsApp untuk konfirmasi pembayaran.', 'success');
        
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
    const packageInfo = formData.package.split('-');
    const packageName = packageInfo.slice(0, -1).join(' ').replace(/-/g, ' ');
    
    return `Halo Anak Alam! 🏔️

Saya ingin melakukan booking untuk:

👤 Nama: ${formData.name}
📱 WhatsApp: ${formData.whatsapp}
🎯 Paket: ${packageName}
📅 Tanggal: ${new Date(formData.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
👥 Jumlah Partisipan: ${formData.participants} orang
💰 Total Pembayaran: Rp${formData.totalPrice.toLocaleString('id-ID')}

Mohon konfirmasi ketersediaan dan informasi pembayaran. Terima kasih! 🙏`;
}

/**
 * Close booking modal
 */
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    const modalContent = document.getElementById('bookingModalContent');
    
    if (modal && modalContent) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.classList.remove('active');
        
        // Reset form
        const form = document.getElementById('bookingForm');
        if (form) {
            form.reset();
        }
        
        // Reset booking data
        bookingModalData = {
            name: '',
            whatsapp: '',
            package: '',
            date: '',
            participants: 1,
            totalPrice: 0
        };
        
        // Enable body scroll
        if (window.CamporaApp && window.CamporaApp.enableBodyScroll) {
            window.CamporaApp.enableBodyScroll();
        }
    }
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Use existing notification system if available
    if (window.CamporaApp && window.CamporaApp.showNotification) {
        window.CamporaApp.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-400 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBookingModal);

// Export functions for global access
if (typeof window !== 'undefined') {
    window.BookingModal = {
        init: initBookingModal,
        open: openBookingModal,
        close: closeBookingModal,
        showNotification: showNotification
    };
}