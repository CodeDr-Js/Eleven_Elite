import React, { useEffect, useState,useRef, useContext} from "react";
import "./newLogin.css";
import newLogo from "../../assets/images/newlogo.png";
import CaptchaVerification from "./catche";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api-service/api-service";
import Cookies from "js-cookie";
import { DataContext } from "../APIs/Api";
import Button from "../loader-btn/loader-btn";

function Login() {
    const {setActiveToken, activeToken, setHasRunRetrieve } = useContext(DataContext);
    const [activeButton, setActiveButton] = useState('login');
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };


      const token1 = Cookies.get("auth-token");
      useEffect(() => {
        if (token1) {
   //       console.log("Your token is", token1);
          navigate("/");
          setActiveToken(token1)
        } else {
       
        }
      }, [token1]);

      const [error, setError] = useState(null);

      const [showLoader, setShowLoader] = useState(false);







  useEffect(() => {
    // Add a class to the body for the login page
    document.body.classList.add("login-body");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);




  const [captchaCode, setCaptchaCode] = useState(""); // Random CAPTCHA code
  //   const [userInput, setUserInput] = useState(""); // User's input
    const [feedback, setFeedback] = useState(""); // Feedback message
    const canvasRef = useRef(null);

   // Generate a random CAPTCHA code
   const generateCaptcha = () => {
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase(); // 6-character alphanumeric
    setCaptchaCode(randomCode);
    drawCaptcha(randomCode);
  };

  // Draw the CAPTCHA on the canvas
  const drawCaptcha = (code) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set random background color
    ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the CAPTCHA code with distortions
    ctx.font = "bold 30px Arial";
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
ctx.transform(1, Math.random() * 0.1, Math.random() * 0.1, 1, 0, 0); // Apply skew

    // ctx.setTransform(1, Math.random() * 0.2, Math.random() * 0.2, 1, 0, 0); // Random skew
    ctx.fillStyle = "black";
    for (let i = 0; i < code.length; i++) {
      ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      ctx.fillText(code[i], 20 + i * 25, 35 + Math.random() * 10);
    }
  };


  const [values, setValues] = useState({
    username:"",
    password:""
  });

  const [verification, setVarification] = useState("");

  const handleVerify = () => {
    if (verification.toUpperCase() === captchaCode) {
      setFeedback("✅ Verification successful!");
      
    } else {
      setFeedback("❌ Incorrect code. Please try again.");
      
    }

    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    setHasRunRetrieve(false);
    setIsLoading(true);
   
    if (verification.toUpperCase() === captchaCode) {
        setFeedback("");
        
        const removeErr = document.getElementById("errorr");
    API.loginUser(values)
      .then((result) => {
        setShowLoader(false);
        setIsLoading(false)
        if (result.success) {
          Cookies.set("auth-token", result.token, { expires: 7 })
          //setToken("auth-token", result.token);
          //console.log({result})
          setActiveToken(result.token)
          navigate("/");
        } else {
          setIsLoading(false);
          setError(result.message);
        }
      })
      .catch((err) => setError(err));
       
        
      } else {
        setIsLoading(false);
        setShowLoader(false);
        setFeedback("❌ Incorrect code. Please try again.");
        
      }
   
    
  }

  setTimeout(() => {
    if (error) {
      setError("");
    }
  }, 10000);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mb-5 mt-4">
        <img className="newlogo" src={newLogo} />
      </div>
      <div>
        <form className="ms-4 me-4">
        {error ? (
              <p className="alert alert-danger">
                {error && error}
              </p>
            ) : (
              ""
            )}
          <i
            id="envelope"
            className="fa fa-user-circle fa-fw fa-lg opacity-50 position-absolute"
          ></i>

          <input
            type="text"
            placeholder="Enter your username"
            className="form-control w-100 form-name mb-4 opacity"
            required
            name="username"
            onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
          />

          <i
            id="envelope"
            className="fa fa-key fa-fw fa-lg opacity-50 position-absolute"
          ></i>

          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter your password"
            name="password"
            className="form-control w-100 form-password mb-4"
            onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
          />

<i onClick={togglePasswordVisibility} id="toggle2" className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"} style={{cursor:"pointer"}}></i>

          <div className="d-flex mb-4">
            <div>
              <i
                id="envelope"
                className="fa fa-user-circle fa-fw fa-lg opacity-50 mt-4 pt-1 position-absolute"
              ></i>
              <input
                type="text"
                placeholder="Varification code"
                className="form-control w-100 form-password pt-3 pb-3 "
                name="verification"
                onChange={(e) => setVarification(e.target.value)}
              />
            </div>

            <div className="ms-4"> {<CaptchaVerification userInput={verification} generateCaptcha={generateCaptcha} canvasRef={canvasRef} />}
            
            </div>
          </div>

          {feedback && <p className="mt-3 alert alert-danger ">{feedback}</p>}
           <div className=" mt-1">
                        <Link
                          className="text-decoration-none text-primary form-forget "
                          to="/forget-password"
                        >
                          Forgot your password?
                        </Link>
                      </div>
          {/* <a href="#" className="">
            Forget password
          </a> */}
      
          {/* <button onClick={handleSubmit} className="btn btn-success w-100 p-3 fw-bold fs-4 mb-3">
            Login
          </button> */}

          {isLoading ? (
            <button className="btn btn-success w-100 p-3 fw-bold disabled opacity-50 text-warning mb-3">
              Loading...
            </button>
          ) : (
            <button
              id="withdraw_id"
              
              className={
               10  > 2 
                  ? "btn btn-success w-100 p-3 fw-bold mb-3 "
                  : "btn btn-success w-100 p-3 fw-bold disabled opacity-50 mb-3 "
              }
              onClick={handleSubmit}
            >
              Login
            </button>
          )}

          <Link to="/register" className="btn btn-primary w-100 p-3 fw-bold fs-4 mb-3">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
