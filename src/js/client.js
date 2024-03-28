document.getElementById('mobile-menu').addEventListener('click', () => {
	const menuItems = document.getElementById('mobile-menu-items')
	if (menuItems.classList.contains('hidden')) {
		menuItems.classList.remove('hidden')
	} else {
		menuItems.classList.add('hidden')
	}
})

document.addEventListener('click', function(event) {
	const menuItems = document.getElementById('mobile-menu-items')
	const mobileMenu = document.getElementById('mobile-menu')
	if (!mobileMenu.contains(event.target) && !menuItems.classList.contains('hidden')) {
		menuItems.classList.add('hidden')
	}
})