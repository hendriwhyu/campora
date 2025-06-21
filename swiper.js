// Inisialisasi Swiper dan menyimpannya ke variabel global
window.swiper = new Swiper(".swiper", {
	// Efek fade untuk transisi yang lebih halus
	effect: "fade",
	fadeEffect: {
		crossFade: true
	},
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
	
	// Aktifkan observer untuk memperbarui Swiper saat elemen diubah
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
});
