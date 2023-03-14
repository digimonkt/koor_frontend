import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export const loginWithGooglePopupProvider = async () => {
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return {
      remote: "success",
      data: res.user,
    };
  } catch (error) {
    return {
      remote: "failure",
      errors: error,
    };
  }
};

export const loginWithFacebookPopupProvider = async () => {
  facebookProvider.setCustomParameters({
    prompt: "select_account",
  });
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    return {
      remote: "success",
      data: res.user,
    };
  } catch (error) {
    return {
      remote: "failure",
      errors: error,
    };
  }
};
export const loginWithAppleFacebookPopupProvider = async () => {
  // TODO: Implement Apple Login
};
