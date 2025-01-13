import React, { useEffect, useState } from 'react'
import "../css/login.css"
import logo from "../assets/logo.png"
import loginback from '../assets/loginback.jpeg'
import GoogleButton from 'react-google-button'
import {useAuth} from "../Auth/AuthContext"
import google from "../assets/google.png"
import github from "../assets/github.png"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Login() {
  const auth = getAuth();
  let navigate=useNavigate()
  const {googleSignIn,githubSignIn,user,resetpass,alertMessage} =useAuth() ;
  let [email,setmail]=useState();
  let [password,setpassword]=useState();
 const handelsignInwidthgoogle =async() =>{
  try {
    await googleSignIn();
    navigate("/home")
  } catch (error) {


  }

 }
 const handelsignInwidthgithub =async() =>{
  try {
    let con =await githubSignIn();
    console.log(con)
    navigate("/dash")
  } catch (error) {


  }

 }
const handelSignInwidhmail=()=>{

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential)
    // ...
  })
  .catch((error) => {
    console.log(error)
  });

}
  return (
    <div>


<section class="flex flex-col md:flex-row h-screen items-center">

<div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
  <img src={loginback} alt="" class="w-full h-full object-cover"/>
</div>

<div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center flex-col">
<div className='logo  flex justify-center  '>
  <img className='w-2/5' src={logo}/>
    </div>
    <div class="w-full h-100">


        <div className='paltform-container mt-9  '>
            <button onClick={handelsignInwidthgoogle} className='sign_button'>
                <img className='w-5 h-5' src={google}/> Continue width Google
            </button>
            <button onClick={handelsignInwidthgithub} className='sign_button'>
                <img className='w-5 h-5' src={github}/> Continue width Github
            </button>
        </div>
        <div>
            {alertMessage && (
                <div className="alert bg-yellow-500 text-white p-4 rounded-lg mt-4 w-full">
                    {alertMessage}
                </div>
            )}
        </div>
        <div className=' divider flex justify-center align-middle mt-7'>
            <div class="inline-flex items-center justify-center">
                <hr class=" absolute w-80 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <span
                    class=" px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
            </div>
        </div>
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-5 ">Log in to your account</h1>

        <div class="mt-6">
            <div>
                <label class="block text-gray-700">Email Address</label>
                <input onChange={(e) => {
                    setmail(e.target.value)
                }} type="email" name="" id="" placeholder="Enter Email Address"
                       class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                       autofocus autocomplete required/>
            </div>

            <div class="mt-4">
                <label class="block text-gray-700">Password</label>
                <input onChange={(e) => {
                    setpassword(e.target.value)
                }} type="password" name="" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none" required/>
            </div>

            <div class="text-right mt-2">
                <button onClick={resetpass} href="#"
                        class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot
                    Password?
                </button>
            </div>

            <button onClick={handelSignInwidhmail} class="login-btn w-full block   text-white font-semibold rounded-lg
            px-4 py-3 mt-6">Log In
            </button>
        </div>


        <p class="mt-8">Need an account? <Link to={"/signup"} class="text-hi font-semibold">Create an
            account</Link></p>


    </div>
</div>

</section>

    </div>
  )
}

export default Login