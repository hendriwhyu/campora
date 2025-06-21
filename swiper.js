const swiper = new Swiper(".swiper", {
	// Efek fade untuk transisi yang lebih halus
	effect: "fade",
	fadeEffect: {
		crossFade: true
	},
	
	// Loop
	loop: true,
	
	// Pagination
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
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
});
