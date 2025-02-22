import React, { useState, useEffect, useRef } from "react";

const CaptchaVerification = ({userInput}) => {
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

  // Verify the user input
  const handleVerify = () => {
    if (userInput.toUpperCase() === captchaCode) {
      setFeedback("✅ Verification successful!");
    } else {
      setFeedback("❌ Incorrect code. Please try again.");
    }
  };

  // Regenerate CAPTCHA when the component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
      <div className="">
        <div className="d-flex">
        <canvas
          ref={canvasRef}
          width={130}
          height={61}
          style={{ border: "0px solid #ccc", marginBottom: "10px", borderRadius: "10px" }}
        ></canvas>
        <div className="position-absolute" onClick={generateCaptcha}>

        <i class="fas fa-sync fa-spin"></i> 
        </div>

        </div>
        {/* <div>
          <button className="btn btn-secondary mb-3" onClick={generateCaptcha}>
            Regenerate Code
          </button>
        </div> */}
        {/* <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter the code here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleVerify}>
          Verify
        </button> */}
        {/* {feedback && <p className="mt-3">{feedback}</p>} */}
      </div>

  );
};

export default CaptchaVerification;