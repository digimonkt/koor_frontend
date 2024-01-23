import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const appleProvider = new OAuthProvider("apple.com");
const auth = getAuth();
export const loginWithGooglePopupProvider = async () => {
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log("Facebook Sign-In Success:", res.user);
    return {
      remote: "success",
      data: res.user,
    };
  } catch (error) {
    console.log("Facebook Sign-In:", error);
    return {
      remote: "failure",
      errors: error,
    };
  }
};

export const loginWithFacebookPopupProvider = async () => {
  // facebookProvider.addScope("email");
  // facebookProvider.addScope("user_phone_number");
  facebookProvider.setCustomParameters({
    prompt: "select_account",
  });
  try {
    const res = await signInWithPopup(auth, facebookProvider); // Fix: Use facebookProvider instead of googleProvider
    console.log("Facebook Sign-In Success:", res.user);
    return {
      remote: "success",
      data: res.user,
    };
  } catch (error) {
    console.error("Facebook Sign-In Error:", error);
    return {
      remote: "failure",
      errors: error,
    };
  }
};

export const loginWithAppleFacebookPopupProvider = async () => {
  try {
    const res = await signInWithPopup(auth, appleProvider);
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
