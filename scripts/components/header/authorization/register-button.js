export { RegisterButton };

class RegisterButton {
	constructor(element) {
		element.addEventListener("click", RegisterButton.handleClick);
	}

	static handleClick(event) {
		event.preventDefault();
		const popUpBg = document.querySelector(".pop-up-bg");
		const registrationForm = document.querySelector(".registration-form");
		popUpBg.classList.add("active");
		registrationForm.classList.add("active");
	}
}
