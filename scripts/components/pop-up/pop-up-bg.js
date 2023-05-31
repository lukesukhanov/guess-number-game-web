export { PopUpBg };

class PopUpBg {
	constructor(element) {
		element.addEventListener("click", PopUpBg.handleClick);
	}

	static handleClick(event) {
		event.preventDefault();
		const popUpForms = document.querySelectorAll(".pop-up-form");
		popUpForms.forEach(form => form.classList.remove("active"));
		event.target.classList.remove("active");
	}
}
