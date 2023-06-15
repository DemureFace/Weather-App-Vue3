import Axios from "axios";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  LOGIN_ACTION,
  SIGNUP_ACTION,
} from "../../storeconstants";
import SignupValidations from "../../../services/SignupValidations.js";

export default {
  async [LOGIN_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    let response = "";
    try {
      response = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBh0Rs7cwpYWZi8Ur2ZdrZ8_Erf6WCFBoU",
        postData
      );
    } catch (err) {
      context.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true });
      let errorMessage = SignupValidations.getErrorMessageFromCode(
        err.response.data.error.message
      );
      throw errorMessage;
    }

    if (response.status === 200) {
      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        email: response.data.email,
        token: response.data.idToken,
        expiresIn: response.data.expiresIn,
        refreshToken: response.data.resfreshToken,
        userId: response.data.localId,
      });
    }
  },

  async [SIGNUP_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    let response = "";

    context.commit(LOADING_SPINNER_SHOW_MUTATION, true, { root: true });

    try {
      response = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBh0Rs7cwpYWZi8Ur2ZdrZ8_Erf6WCFBoU",
        postData
      );
    } catch (err) {
      context.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true });
      let errorMessage = SignupValidations.getErrorMessageFromCode(
        err.response.data.error.message
      );
      throw errorMessage;
    }

    context.commit(LOADING_SPINNER_SHOW_MUTATION, true);

    if (response.status === 200) {
      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        email: response.data.email,
        token: response.data.idToken,
        expiresIn: response.data.expiresIn,
        refreshToken: response.data.resfreshToken,
        userId: response.data.localId,
      });
    }
  },
};
