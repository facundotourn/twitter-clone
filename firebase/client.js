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

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = user => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = file => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)

  return task
}
