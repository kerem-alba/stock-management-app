import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import app from "./app";

const auth = getAuth(app);

export type FirebaseAuthResult = {
  errorCode?: string;
  errorMessage?: string;
  user?: User;
};

const signUp = async (email: string, password: string): Promise<FirebaseAuthResult> => {
  let result: FirebaseAuthResult = {};
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result.user = userCredential.user;
      console.log("Sign Up", result);
    })
    .catch((error) => {
      result.errorCode = error.code;
      result.errorMessage = error.message;
      console.error("Sign Up", result);
    });

  return result;
};

const signIn = async (email: string, password: string): Promise<FirebaseAuthResult> => {
  let result: FirebaseAuthResult = {};
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result.user = userCredential.user;
      console.log("Sign Up", result);
    })
    .catch((error) => {
      result.errorCode = error.code;
      result.errorMessage = error.message;
      console.error("Sign Up", result);
    });

  return result;
};

export default auth;
export { signUp, signIn };
