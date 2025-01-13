import React, { useEffect, useState } from 'react';
import "../css/login.css";
import logo from "../assets/logo.png";
import loginback from '../assets/loginback.jpeg';
import GoogleButton from 'react-google-button';
import { useAuth } from "../Auth/AuthContext";
import google from "../assets/google.png";
import github from "../assets/github.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd'; // Import Ant Design message component

function Login() {
  const auth = getAuth();
  let navigate = useNavigate();
  const { googleSignIn, githubSignIn, user, resetpass, alertMessage, userDetails } = useAuth();
  const [email, setmail] = useState();
  const [password, setpassword] = useState();
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    if (user) {
      userDetails.roleUser === "SuperAdmin"
        ? navigate("/Superadmindash")
        : navigate("/home");
    }
  }, []);

  const showMessage = (type, content) => {
    message[type](content); // Show message with the desired type and content
  };

  const handelsignInwidthgoogle = async () => {
    setLoading(true); // Start loader
    try {
      await googleSignIn();
      showMessage("success", "Login successful with Google!");
      userDetails.roleUser === "SuperAdmin"
        ? navigate("/Superadmindash")
        : navigate("/home");
    } catch (error) {
      showMessage("error", "Login failed with Google.");
      console.error(error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handelsignInwidthgithub = async () => {
    setLoading(true); // Start loader
    try {
      await githubSignIn();
      showMessage("success", "Login successful with GitHub!");
      userDetails.roleUser === "SuperAdmin"
        ? navigate("/Superadmindash")
        : navigate("/home");
    } catch (error) {
      showMessage("error", "Login failed with GitHub.");
      console.error(error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handelSignInwidhmail = () => {
    setLoading(true); // Start loader
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage("success", "Login successful!");
        userDetails.roleUser === "SuperAdmin"
          ? navigate("/Superadmindash")
          : navigate("/home");
      })
      .catch((error) => {
        showMessage("error", "Login failed. Please check your credentials.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Stop loader
      });
  };

  return (
    <div className="h-full">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      <section className="flex flex-col md:flex-row items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 ">
          <img src={loginback} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="bg-white w-full   md:w-1/2 xl:w-1/3  px-6  xl:px-12 flex items-center justify-center flex-col">
          <div className="logo flex justify-center">
            <img className="w-2/5" src={logo} />
          </div>
          <div className="w-full h-100">
            <div className="paltform-container mt-9">
              <button onClick={handelsignInwidthgoogle} className="sign_button">
                <img className="w-5 h-5" src={google} /> Continue with Google
              </button>
              <button onClick={handelsignInwidthgithub} className="sign_button">
                <img className="w-5 h-5" src={github} /> Continue with Github
              </button>
            </div>
            <div>
              {alertMessage && (
                <div className="alert bg-yellow-500 text-white p-4 rounded-lg mt-4 w-full">
                  {alertMessage}
                </div>
              )}
            </div>
            <div className="divider flex justify-center align-middle mt-7">
              <div className="inline-flex items-center justify-center">
                <hr className="absolute w-80 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
              </div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-5">Log in to your account</h1>

            <div className="mt-6">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  onChange={(e) => setmail(e.target.value)}
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="text-right mt-2">
                <button onClick={resetpass} className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </button>
              </div>

              <button onClick={handelSignInwidhmail} className="login-btn w-full block text-white font-semibold rounded-lg px-4 py-3 mt-6">
                Log In
              </button>
            </div>

            <p className="mt-8">
              Need an account? <Link to={"/signup"} className="text-hi font-semibold">Create an account</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
