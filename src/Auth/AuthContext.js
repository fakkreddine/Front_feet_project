
import { createContext,useContext, useEffect, useState } from "react";
import { GithubAuthProvider } from "firebase/auth";
import {auth} from "./firebase"
import { getAuth,sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";
const AuthContext=createContext();
export const AuthProvider=({children})=>{
     // React Router's useNavigate for redirection
  
const auth=getAuth();
const resetpass=async()=>{
  sendPasswordResetEmail(auth, user.email)
  .then(() => {
    console.log("email sent")
    
  })
  .catch((error) => {
    console.log("error")
    // ..
  });

}
    const googleSignIn=async()=>{
        try {
            const Provider=new GoogleAuthProvider();
           await signInWithPopup(auth, Provider)
        } catch (error) {
                    
        }
        
    }
    const githubSignIn=async()=>{
        try {
            const Provider = new GithubAuthProvider();
            await  signInWithPopup(auth, Provider)
        } catch (error) {
                    
        }
        
    }
    const sinupwihmailandpass=async(email,password)=>{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      console.log(userCredential)
       setUser(userCredential.user) ;
        // ...
      })
      .catch((error) => {
       console.log(error)
      });
      
  }

let [user,setUser]=useState(null)
let [Loding,setLoding]=useState(true)

    useEffect(()=>{
            const uns=onAuthStateChanged(auth,(curentuser)=>{
              
                console.log(curentuser)
                setUser(curentuser)
                setLoding(false)
            })
            
          
              // Set interval to refresh token every minute
              
            return()=>{
                uns()
              
            }
    },[])
   
    useEffect(()=>{
        const refreshToken = async () => {
            if (user)   {
              try {
                await user.getIdToken(true); 
                console.log("cookies updated ")// Force token refresh
                
              } catch (error) {
               
                setUser(null);
                
              }
            }
          };
          const intervalId = setInterval(refreshToken, 1000);
          return()=>{
           
            clearInterval(intervalId); 
          
        }
    },[user])
    return(
         <AuthContext.Provider value={{googleSignIn,githubSignIn,user,resetpass,sinupwihmailandpass,auth,Loding}}>
        {children}
     </AuthContext.Provider>
     )
   
    

}

export const useAuth=()=>{
    return useContext(AuthContext)
}