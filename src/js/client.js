// Klasa "hidden" jest w pliku "main.css"

/*
Obsługa kliknięcia na element o id 'mobile-menu'. 
Po kliknięciu, funkcja sprawdza, czy elementy menu są aktualnie ukryte. 
Jeśli tak - są one pokazywane (klasa 'hidden' jest usuwana). 
Jeśli nie - są one ukrywane (klasa 'hidden' jest dodawana). 
W ten sposób użytkownik może pokazać i ukryć elementy menu po kliknięciu na ikonę menu.
*/
document.getElementById('mobile-menu').addEventListener('click', () => {
	const menuItems = document.getElementById('mobile-menu-items')
	if (menuItems.classList.contains('hidden')) {
		menuItems.classList.remove('hidden')
	} else {
		menuItems.classList.add('hidden')
	}
})

/*
Obsługa kliknięcia gdziekolwiek na stronie. 
Po kliknięciu, funkcja sprawdza, czy kliknięcie nie było na ikonie menu i czy elementy menu są aktualnie pokazane. 
Jeśli oba warunki są spełnione - elementy menu są ukrywane (klasa 'hidden' jest dodawana). 
W ten sposób, jeśli użytkownik kliknie gdziekolwiek poza menu, a elementy menu są widoczne, to są one ukrywane.
*/
document.addEventListener('click', function(event) {
	const menuItems = document.getElementById('mobile-menu-items')
	const mobileMenu = document.getElementById('mobile-menu')
	if (!mobileMenu.contains(event.target) && !menuItems.classList.contains('hidden')) {
		menuItems.classList.add('hidden')
	}
})