import { REGISTER_API_URL } from "../properties";

export { SignUpBtn };

class SignUpBtn {
  constructor(element) {
    element.addEventListener("click", SignInBtn.handleClick);
  }

  static handleClick() {
    const response = await fetch(REGISTER_API_URL, {
      Origin: ORIGIN_URL,
    });
  }
}
