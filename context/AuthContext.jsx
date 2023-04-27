

import React, { useContext, useState, useEffect } from "react"
import { auth ,firebaseConfig } from "../firebase_ops/app"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  // register
  const  signup = (email, password) =>{
    return createUserWithEmailAndPassword(auth,email, password)
  }

  // login
  function login(email, password) {
    console.log(email)
    return signInWithEmailAndPassword(auth,email, password)
  }

  // google
   function signInWithGoogle(){
        const provider = new GoogleAuthProvider();

        return signInWithPopup(auth, provider)
  };

  // logout
  function logout() {
    return signOut(auth)
  }

  // reset password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  // update email
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  // update password
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  // change current user, loading state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
