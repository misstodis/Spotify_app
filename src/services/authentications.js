import { auth, db } from '../firebase/firebase-config.js';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

// login with user
export const loginWithGoogle = () => {
  // get provie login of google
  const provider = new GoogleAuthProvider();
  return (
    signInWithPopup(auth, provider)
      // this returns a promise with results
      .then((res) => {
        // get user
        const user = res.user;
        // save user to fire store
        handleSaveUserToFireBase(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
      })
  );
};

export const loginWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage);
    });
};

// save user to firebase
const handleSaveUserToFireBase = async (user) => {
  const userDisplayname = user.displayName;
  const userImageUrl = user.photoURL;

  let tempUser = {
    username: userDisplayname ? userDisplayname : user.email.slice(0, 3),
    profileImage: userImageUrl
      ? userImageUrl
      : 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    email: user.email,
  };

  // Add a new document in collection "Users"
  await setDoc(doc(db, 'Users', user.uid), {
    ...tempUser,
  });
};
