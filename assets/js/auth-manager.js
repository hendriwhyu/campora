// Authentication and user management functionality

let isLoggedIn = false;
let currentUser = null;

/**
 * Open authentication modal
 */
function openAuthModal() {
	const authModal = document.getElementById("authModal");
	if (authModal) {
		showLoginForm(); // Default to login form
		disableBodyScroll();
	}
}

/**
 * Close authentication modal
 */
function closeAuthModalHandler() {
	const authModal = document.getElementById("authModal");
	if (authModal) {
		authModal.classList.remove("active");
		authModal.classList.add("hidden");
		enableBodyScroll();
	}
}

/**
 * Show register form
 */
function showRegisterForm() {
	const loginForm = document.getElementById("loginForm");
	const registerForm = document.getElementById("registerForm");

	if (loginForm && registerForm) {
		loginForm.classList.remove("active");
		registerForm.classList.add("active");
	}
}

/**
 * Show login form
 */
function showLoginForm() {
	const loginForm = document.getElementById("loginForm");
	const registerForm = document.getElementById("registerForm");
	const authModal = document.getElementById("authModal");

	if (loginForm && registerForm && authModal) {
		loginForm.classList.remove("active");
		registerForm.classList.remove("active");
		authModal.classList.remove("hidden");
	}
}

/**
 * Handle login form submission
 * @param {Event} event - The form submit event
 */
function handleLogin(event) {
	event.preventDefault();

	const email = document.getElementById("loginEmail").value;
	const password = document.getElementById("loginPassword").value;

	// Simple validation
	if (!email || !password) {
		alert("Please fill in all fields");
		return;
	}

	// Simulate login process
	simulateLogin(email);
}

/**
 * Handle register form submission
 * @param {Event} event - The form submit event
 */
function handleRegister(event) {
	event.preventDefault();

	const name = document.getElementById("registerName").value;
	const email = document.getElementById("registerEmail").value;
	const password = document.getElementById("registerPassword").value;
	const confirmPassword = document.getElementById("confirmPassword").value;

	// Simple validation
	if (!name || !email || !password || !confirmPassword) {
		alert("Please fill in all fields");
		return;
	}

	if (password !== confirmPassword) {
		alert("Passwords do not match");
		return;
	}

	// Simulate registration process
	simulateRegister(name, email);
}

/**
 * Handle Google authentication
 */
function handleGoogleAuth() {
	// Simulate Google authentication
	simulateGoogleAuth();
}

/**
 * Simulate login process
 * @param {string} email - User email
 */
function simulateLogin(email) {
	// In a real app, this would make an API call
	setTimeout(() => {
		isLoggedIn = true;
		currentUser = {
			name: email.split("@")[0],
			email: email,
			avatar: "assets/images/default-avatar.jpg",
		};
		updateAuthUI();
		closeAuthModalHandler();
		alert("Login successful!");
	}, 1000);
}

/**
 * Simulate registration process
 * @param {string} name - User name
 * @param {string} email - User email
 */
function simulateRegister(name, email) {
	// In a real app, this would make an API call
	setTimeout(() => {
		isLoggedIn = true;
		currentUser = {
			name: name,
			email: email,
			avatar: "assets/images/default-avatar.jpg",
		};
		updateAuthUI();
		closeAuthModalHandler();
		alert("Registration successful!");
	}, 1000);
}

/**
 * Simulate Google authentication
 */
function simulateGoogleAuth() {
	// In a real app, this would integrate with Google OAuth
	setTimeout(() => {
		isLoggedIn = true;
		currentUser = {
			name: "Google User",
			email: "user@gmail.com",
			avatar: "assets/images/default-avatar.jpg",
		};
		updateAuthUI();
		closeAuthModalHandler();
		alert("Google authentication successful!");
	}, 1000);
}

/**
 * Handle logout
 */
function handleLogout() {
	isLoggedIn = false;
	currentUser = null;
	updateAuthUI();
	alert("Logged out successfully!");
}

/**
 * Update UI based on authentication status
 */
function updateAuthUI() {
	const loginBtn = document.getElementById("loginBtn");
	const userMenu = document.getElementById("userMenu");
	const userName = document.getElementById("userName");
	const userAvatar = document.getElementById("userAvatar");

	if (isLoggedIn && currentUser) {
		// Show user menu, hide login button
		if (loginBtn) loginBtn.classList.add("hidden");
		if (userMenu) userMenu.classList.remove("hidden");
		if (userName) userName.textContent = currentUser.name;
		if (userAvatar) userAvatar.src = currentUser.avatar;
	} else {
		// Show login button, hide user menu
		if (loginBtn) loginBtn.classList.remove("hidden");
		if (userMenu) userMenu.classList.add("hidden");
	}
}

/**
 * Toggle user dropdown
 */
function toggleUserDropdown() {
	const userDropdown = document.getElementById("userDropdown");
	if (userDropdown) {
		userDropdown.classList.toggle("hidden");
	}
}

/**
 * Initialize authentication functionality
 */
function initAuthManager() {
	// Get DOM elements
	const loginBtn = document.getElementById("loginBtn");
	const authModal = document.getElementById("authModal");
	const closeAuthModal = document.getElementById("closeAuthModal");
	const showRegister = document.getElementById("showRegister");
	const loginForm = document.getElementById("loginForm");
	const registerForm = document.getElementById("registerForm");
	const googleLoginBtn = document.getElementById("googleLogin");
	const googleRegisterBtn = document.getElementById("googleRegister");
	const userDropdown = document.getElementById("userDropdown");
	const logoutBtn = document.getElementById("logoutBtn");

	// Add event listeners
	if (loginBtn) {
		loginBtn.addEventListener("click", openAuthModal);
	}

	if (closeAuthModal) {
		closeAuthModal.addEventListener("click", closeAuthModalHandler);
	}

	if (showRegister) {
		showRegister.addEventListener("click", showRegisterForm);
	}

	if (loginForm) {
		loginForm.addEventListener("submit", handleLogin);
	}

	if (registerForm) {
		registerForm.addEventListener("submit", handleRegister);
	}

	if (googleLoginBtn) {
		googleLoginBtn.addEventListener("click", handleGoogleAuth);
	}

	if (googleRegisterBtn) {
		googleRegisterBtn.addEventListener("click", handleGoogleAuth);
	}

	if (logoutBtn) {
		logoutBtn.addEventListener("click", handleLogout);
	}

	// Close modal when clicking outside
	if (authModal) {
		authModal.addEventListener("click", function (event) {
			if (event.target === authModal) {
				closeAuthModalHandler();
			}
		});
	}

	// Close dropdown when clicking outside
	document.addEventListener("click", function (event) {
		if (userDropdown && !userDropdown.contains(event.target)) {
			userDropdown.classList.add("hidden");
		}
	});

	// Initialize UI based on login status
	updateAuthUI();
}
