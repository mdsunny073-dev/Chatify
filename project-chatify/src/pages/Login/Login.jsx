import React, { useState } from "react";
import login from "../../assets/Login.png";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";
import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../Slices/UserSlice";

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [emailerror, setEmailerror] = useState("");
  const [passworderror, setPassworderror] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const [error, setError] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerror("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderror("");
  };

  const handleClick = () => {
    if (!email) {
      setEmailerror("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerror("Invalid email address");
      }
    }

    if (!password) {
      setPassworderror("Password is required");
      // }else if(!/(?=.*[a-z])/.test(password)){
      //     setPassworderror('The string must contain at least 1 lowercase alphabetical character')
      // }else if(!/(?=.*[A-Z])/.test(password)){
      //     setPassworderror('The string must contain at least 1 uppercase alphabetical character')
      // }else if(!/(?=.*[0-9])/.test(password)){
      //     setPassworderror('The string must contain at least 1 numeric character')
      // }else if(!/(?=.*[!@#$%^&*])/.test(password)){
      //     setPassworderror('The string must contain at least one special character(For example: !@#$%^&*)')
      // }else if(!/(?=.{8,})/.test(password)){
      //     setPassworderror('The string must be eight characters or longer')
    }

    if (
      email &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success("Login Done");
          console.log(user);
          dispatch(userLoginInfo(user));
          localStorage.setItem(
            "userLoginInfo",
            JSON.stringify(userLoginInfo(user))
          );
          setTimeout(() => {
            navigate("/Home");
          }, 3000);
          setEmail("");
          setFullName("");
          setPassword("");
          setTimeout(() => {}, 5000);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-login-credentials")) {
            setError("Invalid Credentials");
          }
        });
    }
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const handleForgotPassword = () => {
    setForgotPasswordModal(true);
  };
  const handleCancel = () => {
    setForgotPasswordModal(false);
  };

  const submitForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        const errorCode = error.code;
      });
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 flex justify-end">
          <div className="mr-[69px] mt-[225px]">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              limit={1}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="dark"
            />
            <h1 className="text-[#11175D] font-nunito text-[34.401px] font-bold">
              Login to your account!
            </h1>
            <div className="mt-[30px] relative">
              <input
                type="text"
                className="w-[220px] py-[20px] pr-[42px] pl-[30px] border-[0.834px] border-[#03014C] rounded-lg "
              />
              <p className="absolute top-[24px] font-sans font-semibold text-[13.338px] text-[#03014C] tracking-[0.267px] ml-[60px]">
                Login with Google
              </p>
              <img
                onClick={googleSignIn}
                className="mt-[-42px] ml-[28px]"
                src={google}
                alt="google"
              />
              {error && (
                <p className="font-nunito font-semibold bg-[#FF0000] text-white px-[10px] py-[2px] mt-[30px] rounded">
                  {error}
                </p>
              )}
            </div>
            <div className="mt-[62px] relative w-96">
              <input
                type="email"
                onChange={handleEmail}
                className="w-full py-[20px] px-[10px] border-b-2 border-[#11175D] outline-none"
              />
              <p className="absolute top-[-10px] left-[5px] font-nunito font-semibold text-[13.76px] text-[#11175D] tracking-[1.032px] px-0 bg-white">
                Email Address
              </p>
              {emailerror && (
                <p className="font-nunito font-semibold bg-[#FF0000] text-white px-[10px] py-[2px] mt-[2px] rounded">
                  {emailerror}
                </p>
              )}
            </div>
            <div className="mt-[47px] relative w-96">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handlePassword}
                className="w-full py-[20px] px-[10px] border-b-2 border-[#11175D] outline-none"
              />
              <p className="absolute top-[-10px] left-[5px] font-nunito font-semibold text-[13.76px] text-[#11175D] tracking-[1.032px] px-0 bg-white">
                Password
              </p>
              {showPassword ? (
                <RiEye2Line
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[28px] right-[20px]"
                />
              ) : (
                <RiEyeCloseFill
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[28px] right-[20px]"
                />
              )}
              {passworderror && (
                <p className="font-nunito font-semibold bg-[#FF0000] text-white px-[10px] py-[2px] mt-[2px] rounded">
                  {passworderror}
                </p>
              )}
            </div>
            <div className="mt-[51px] w-96">
              <div
                onClick={handleClick}
                className="bg-primary cursor-pointer text-center py-[20px] rounded-lg"
              >
                <p className="font-nunito font-semibold text-[20px] text-white">
                  Login to Continue
                </p>
              </div>
            </div>
            <div className="text-[#03014C] font-sans text-[13.338px] mt-[35px] ml-[75px]">
              <h1>
                Don’t have an account ?{" "}
                <span className="text-[#EA6C00] font-bold">
                  <Link to="/">Sign up for Chatify</Link>
                </span>
              </h1>
              <h2
                onClick={handleForgotPassword}
                className=" font-sans text-[16px] text-[#EA6C00] mt-[35px] ml-[45px]"
              >
                Forgotten Password?
              </h2>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img
            className="w-full h-screen object-cover"
            src={login}
            alt="login"
          />
        </div>
      </div>
      {forgotPasswordModal && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex justify-center items-center">
          <div className="w-1/2 bg-white p-10 rounded ">
            <h2 className="text-[#11175D] font-nunito text-[34.401px] font-bold">
              Forgotten Password?
            </h2>
            <div className="mt-[62px] relative w-96">
              <input
                type="email"
                onChange={handleEmail}
                value={email}
                className="w-full py-[26px] px-[50px] border-2 border-[#11175D] rounded-lg"
              />
              <p className="absolute top-[-9px] left-[32px] font-nunito font-semibold text-[13.76px] text-[#11175D] tracking-[1.032px] px-[18px] bg-white">
                Email Address
              </p>
              {emailerror && (
                <p className="font-nunito font-semibold bg-[#FF0000] text-white px-[10px] py-[2px] mt-[2px] rounded">
                  {emailerror}
                </p>
              )}
            </div>
            <div className="flex mt-[40px]">
              <div
                onClick={submitForgotPassword}
                className="w-[250px] bg-[#11175D] cursor-pointer text-center py-[20px] rounded-lg border-[#11175D]"
              >
                <p className="font-nunito font-semibold text-[20px] text-white">
                  Submit
                </p>
              </div>
              <div
                onClick={handleCancel}
                className="w-[250px] ml-[30px] bg-[#11175D] cursor-pointer text-center py-[20px] rounded-lg"
              >
                <p className="font-nunito font-semibold text-[20px] text-white">
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
