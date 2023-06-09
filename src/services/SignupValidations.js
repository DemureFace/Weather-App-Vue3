import Validations from "./Validations";

export default class SignupValidations {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  checkValidations() {
    let errors = [];

    // Email Validations
    if (!Validations.checkEmail(this.email)) {
      errors["email"] = "Invalid Email";
    }

    //password Validation
    if (!Validations.minLength(this.password, 6)) {
      errors["password"] = "password should be of 6 characters";
    }

    return errors;
  }

  static getErrorMessageFromCode(errorCode) {
    switch (errorCode) {
      case "EMAIL_EXISTS":
        return "Email alredy exists";
      case "EMAIL_NOT_FOUND":
        return "Email Not Found";
      case "INVALID_PASSWORD":
        return "Invalid Password";
      default:
        return "Unexpected error occurred. Please try again";
    }
  }
}
