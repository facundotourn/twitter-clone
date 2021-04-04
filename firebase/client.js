import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB0nQgbYE1aoulFRakhdGxqgwRmKlEQzxo',
  authDomain: 'devter-b4b41.firebaseapp.com',
  projectId: 'devter-b4b41',
  storageBucket: 'devter-b4b41.appspot.com',
  messagingSenderId: '455775404861',
  appId: '1:455775404861:web:6a49b89def6f6cf4dcbb54',
  measurementId: 'G-2QTEYS9E5F',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (!user) return

    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
