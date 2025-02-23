import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from 'axios';
import { setTokenIntoLocalStorage } from "../utils/utils";
import { verifyToken } from "../utils/verifyToken";

const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('Role->',role)
    
  
    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }
  
    const signIn = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }
  
    const signInWithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }
  
    const logOut = async () => {
      setLoading(true)
      return signOut(auth)
    }
  
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }
  
   
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async currentUser => {
        console.log('CurrentUser-->', currentUser?.email)
  
        if (currentUser?.email) {
          setUser(currentUser)
console.log(currentUser)
          const token = JSON.parse(localStorage.getItem('TaskManagementSystemToken'))

          if(token){
            const verifyUser = verifyToken(token);
            
            if(verifyUser?.email === currentUser?.email){
              setRole(verifyUser.role)
            }
            
          }else{
        
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auths/jwt`,
            {
              email: currentUser?.email,
          
            },
           
            { withCredentials: true }
          )

          const verifyUser = verifyToken(response.data.data.tokenData.token);
            
            if(verifyUser?.email === currentUser?.email){
              setRole(verifyUser.role)
              await setTokenIntoLocalStorage(response.data.data.tokenData.token)
            }
          
          }  
        }
         else {
          setUser(null)
        
          setRole(null);
          localStorage.removeItem('ParcelManagementSystemToken');
        }
        setLoading(false)
      })
      return () => {
        return unsubscribe()
      }
    }, [])
  
    const authInfo = {
      role,
      setRole,
      user,
      setUser,
      loading,
      setLoading,
      createUser,
      signIn,
      signInWithGoogle,
      logOut,
      updateUserProfile,
    }
  
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    )
};

export default AuthProvider;