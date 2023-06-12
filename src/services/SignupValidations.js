import Validations from "./Validations";

export default class SignupValidations {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  checkValidations() {
    let errors = [];

    //username Validation
    if (!Validations.minLength(this.username, 8)) {
      errors["username"] = "username should be of 8 characters";
    }

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
