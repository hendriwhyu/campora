document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.getElementById("hamburger-menu");
	const mobileMenu = document.getElementById("mobile-menu");
	const modal = document.getElementById("imageModal");
	const modalImg = document.getElementById("modalImage");
	const closeModal = document.getElementById("closeModal");
	// Ubah selector untuk gambar yang bisa diklik
	const images = document.querySelectorAll(
		".grid img, .swiper-slide .grid img"
	);

	// Custom selector function since :contains is not standard
	function getButtonByText(text) {
		const buttons = document.querySelectorAll("button");
		for (let button of buttons) {
			if (button.textContent.trim() === text) {
				return button;
			}
		}
		return null;
	}

	const curugBtn = getButtonByText("Curug");
	const gunungBtn = getButtonByText("Gunung");

	// Function to filter slides based on type
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

		// Testimonial carousel functionality
		const testimonialCarousel = document.querySelector(".testimonial-carousel");
		const testimonialCards = document.querySelectorAll(".testimonial-card");
		const prevBtn = document.querySelector(".testimonial-prev");
		const nextBtn = document.querySelector(".testimonial-next");

		let currentTestimonialIndex = 0;

		function showTestimonial(index) {
			testimonialCards.forEach((card, i) => {
				card.style.display = i === index ? "block" : "none";
			});
		}

		function nextTestimonial() {
			currentTestimonialIndex =
				(currentTestimonialIndex + 1) % testimonialCards.length;
			showTestimonial(currentTestimonialIndex);
		}

		function prevTestimonial() {
			currentTestimonialIndex =
				(currentTestimonialIndex - 1 + testimonialCards.length) %
				testimonialCards.length;
			showTestimonial(currentTestimonialIndex);
		}

		if (nextBtn && prevBtn) {
			nextBtn.addEventListener("click", nextTestimonial);
			prevBtn.addEventListener("click", prevTestimonial);
		}

		// Initialize testimonial carousel
		if (testimonialCards.length > 0) {
			showTestimonial(0);
		}

		// Auth Modal and User Management
		const authModal = document.getElementById("authModal");
		const loginBtn = document.getElementById("loginBtn");
		const mobileLoginBtn = document.getElementById("mobileLoginBtn");
		const userBtn = document.getElementById("userBtn");
		const mobileUserBtn = document.getElementById("mobileUserBtn");
		const userDropdown = document.getElementById("userDropdown");
		const mobileUserDropdown = document.getElementById("mobileUserDropdown");
		const loginForm = document.getElementById("loginForm");
		const registerForm = document.getElementById("registerForm");
		const showRegisterBtn = document.getElementById("showRegister");
		const showLoginBtn = document.getElementById("showLogin");
		const closeModalBtn = document.getElementById("closeAuthModal");

		// State management
		let isLoggedIn = false;
		let currentUser = null;

		// Open login modal
		function openLoginModal() {
			authModal.classList.remove("hidden");
			showLoginForm();
		}

		// Close modal
		function closeModal() {
			authModal.classList.add("hidden");
		}

		// Show login form
		function showLoginForm() {
			loginForm.classList.remove("hidden");
			registerForm.classList.add("hidden");
		}

		// Show register form
		function showRegisterForm() {
			loginForm.classList.add("hidden");
			registerForm.classList.remove("hidden");
		}

		// Toggle user dropdown
		function toggleUserDropdown() {
			userDropdown.classList.toggle("hidden");
		}

		// Toggle mobile user dropdown
		function toggleMobileUserDropdown() {
			mobileUserDropdown.classList.toggle("hidden");
		}

		// Simulate login
		function simulateLogin(email) {
			isLoggedIn = true;
			currentUser = {
				name: email.split("@")[0],
				email: email,
			};

			// Update UI
			updateUIAfterLogin();
			closeModal();
		}

		// Update UI after login
		function updateUIAfterLogin() {
			// Desktop
			loginBtn.classList.add("hidden");
			userBtn.classList.remove("hidden");
			document.getElementById("userName").textContent = currentUser.name;

			// Mobile
			mobileLoginBtn.classList.add("hidden");
			mobileUserBtn.classList.remove("hidden");
			document.getElementById("mobileUserName").textContent = currentUser.name;
		}

		// Logout function
		function logout() {
			isLoggedIn = false;
			currentUser = null;

			// Reset UI
			loginBtn.classList.remove("hidden");
			userBtn.classList.add("hidden");
			mobileLoginBtn.classList.remove("hidden");
			mobileUserBtn.classList.add("hidden");

			// Hide dropdowns
			userDropdown.classList.add("hidden");
			mobileUserDropdown.classList.add("hidden");
		}

		// Event listeners
		if (loginBtn) {
			loginBtn.addEventListener("click", openLoginModal);
		}

		if (mobileLoginBtn) {
			mobileLoginBtn.addEventListener("click", openLoginModal);
		}

		if (userBtn) {
			userBtn.addEventListener("click", toggleUserDropdown);
		}

		if (mobileUserBtn) {
			mobileUserBtn.addEventListener("click", toggleMobileUserDropdown);
		}

		if (closeModalBtn) {
			closeModalBtn.addEventListener("click", closeModal);
		}

		if (showRegisterBtn) {
			showRegisterBtn.addEventListener("click", (e) => {
				e.preventDefault();
				showRegisterForm();
			});
		}

		if (showLoginBtn) {
			showLoginBtn.addEventListener("click", (e) => {
				e.preventDefault();
				showLoginForm();
			});
		}

		// Handle form submissions
		if (loginForm) {
			loginForm.addEventListener("submit", (e) => {
				e.preventDefault();
				const email = document.getElementById("loginEmail").value;
				const password = document.getElementById("loginPassword").value;

				if (email && password) {
					simulateLogin(email);
				}
			});
		}

		if (registerForm) {
			registerForm.addEventListener("submit", (e) => {
				e.preventDefault();
				const email = document.getElementById("registerEmail").value;
				const password = document.getElementById("registerPassword").value;

				if (email && password) {
					simulateLogin(email);
				}
			});
		}

		// Google login simulation
		function loginWithGoogle() {
			simulateLogin("user@gmail.com");
		}

		// Close modal when clicking outside
		if (authModal) {
			authModal.addEventListener("click", (e) => {
				if (e.target === authModal) {
					closeModal();
				}
			});
		}

		// Close dropdowns when clicking outside
		document.addEventListener("click", (e) => {
			if (!userBtn?.contains(e.target) && !userDropdown?.contains(e.target)) {
				userDropdown?.classList.add("hidden");
			}

			if (
				!mobileUserBtn?.contains(e.target) &&
				!mobileUserDropdown?.contains(e.target)
			) {
				mobileUserDropdown?.classList.add("hidden");
			}
		});

		// Google login buttons
		const googleLoginBtns = document.querySelectorAll(
			'[onclick="loginWithGoogle()"]'
		);
		googleLoginBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				loginWithGoogle();
			});
		});

		// Logout buttons
		const logoutBtns = document.querySelectorAll('[onclick="logout()"]');
		logoutBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				logout();
			});
		});

		// Update Swiper to reflect changes
		if (window.swiper) {
			window.swiper.update();
			window.swiper.updateSlides();
		}
	}

	// Add click event listeners to the buttons
	if (curugBtn) {
		curugBtn.addEventListener("click", function () {
			// Update active state for buttons
			curugBtn.classList.add("bg-white", "text-[#347928]");
			curugBtn.classList.remove(
				"bg-transparent",
				"border",
				"border-solid",
				"border-white",
				"text-white"
			);

			if (gunungBtn) {
				gunungBtn.classList.remove("bg-white", "text-[#347928]");
				gunungBtn.classList.add(
					"bg-transparent",
					"border",
					"border-solid",
					"border-white",
					"text-white"
				);
			}

			// Filter destinations
			filterDestinations("curug");
		});
	}

	if (gunungBtn) {
		gunungBtn.addEventListener("click", function () {
			// Update active state for buttons
			gunungBtn.classList.add("bg-white", "text-[#347928]");
			gunungBtn.classList.remove(
				"bg-transparent",
				"border",
				"border-solid",
				"border-white",
				"text-white"
			);

			if (curugBtn) {
				curugBtn.classList.remove("bg-white", "text-[#347928]");
				curugBtn.classList.add(
					"bg-transparent",
					"border",
					"border-solid",
					"border-white",
					"text-white"
				);
			}

			// Filter destinations
			filterDestinations("gunung");
		});
	}

	// Initialize with all destinations shown
	filterDestinations("all");

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
