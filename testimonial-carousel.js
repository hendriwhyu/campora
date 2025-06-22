// Testimonial Carousel Implementation
class TestimonialCarousel {
    constructor() {
        this.swiperInstance = null;
        this.init();
    }

    init() {
        this.renderTestimonials();
        this.initSwiper();
    }

    // Render testimonials ke dalam swiper wrapper
    renderTestimonials() {
        const swiperWrapper = document.querySelector('.testimonial-swiper .swiper-wrapper');
        if (!swiperWrapper) return;

        const testimonialsHTML = window.testimonialsData.map(testimonial => {
            return this.createTestimonialSlide(testimonial);
        }).join('');

        swiperWrapper.innerHTML = testimonialsHTML;
    }

    // Membuat slide testimonial individual
    createTestimonialSlide(testimonial) {
        return `
            <div class="swiper-slide">
                <div class="testimonial-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mx-2">
                    <!-- Header dengan avatar dan info -->
                    <div class="flex items-start gap-4 mb-4">
                        <div class="flex-shrink-0">
                            <img 
                                src="${testimonial.avatar}" 
                                alt="${testimonial.name}"
                                class="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                                onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'"
                            >
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between mb-1">
                                <h4 class="font-semibold text-gray-900 truncate">${testimonial.name}</h4>
                                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    ${testimonial.location}
                                </span>
                            </div>
                            <div class="flex items-center gap-2 mb-2">
                                <div class="flex items-center">
                                    ${stars}
                                </div>
                                <span class="text-sm text-gray-600">${testimonial.date}</span>
                            </div>
                            <div class="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md inline-block">
                                ${testimonial.trip}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Testimonial text -->
                    <div class="testimonial-text">
                        <p class="text-gray-700 leading-relaxed text-sm">
                            "${testimonial.text}"
                        </p>
                    </div>
                    
                    <!-- Quote icon -->
                    <div class="flex justify-end mt-4">
                        <svg class="w-8 h-8 text-green-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }

    // Inisialisasi Swiper untuk testimonials
    initSwiper() {
        // Tunggu sebentar untuk memastikan DOM sudah siap
        setTimeout(() => {
            this.swiperInstance = new Swiper('.testimonial-swiper', {
                // Konfigurasi khusus untuk testimonials
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                
                // Responsive breakpoints
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 32,
                    }
                },
                
                // Pagination
                pagination: {
                    el: '.testimonial-swiper .swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                
                // Navigation (opsional, bisa ditambahkan jika diperlukan)
                // navigation: {
                //     nextEl: '.testimonial-swiper .swiper-button-next',
                //     prevEl: '.testimonial-swiper .swiper-button-prev',
                // },
                
                // Effect
                effect: 'slide',
                
                // Observer untuk update otomatis
                observer: true,
                observeParents: true,
                
                // Smooth transitions
                speed: 600,
                
                // Grab cursor
                grabCursor: true,
            });
        }, 100);
    }

    // Method untuk update testimonials (jika diperlukan)
    updateTestimonials(newTestimonials) {
        if (newTestimonials && Array.isArray(newTestimonials)) {
            window.testimonialsData = newTestimonials;
            this.renderTestimonials();
            if (this.swiperInstance) {
                this.swiperInstance.update();
            }
        }
    }

    // Method untuk destroy swiper (cleanup)
    destroy() {
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
    }
}

// Inisialisasi testimonial carousel saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Pastikan testimonialsData tersedia
    if (typeof testimonialsData !== 'undefined') {
        window.testimonialCarousel = new TestimonialCarousel();
    } else {
        console.error('testimonialsData tidak ditemukan. Pastikan testimonial-data.js sudah dimuat.');
    }
});

// Export untuk penggunaan sebagai module (opsional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialCarousel;
}