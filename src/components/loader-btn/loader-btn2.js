import "./button/button2.css";

const Loader = ({ className }) => (
  <div className={className}>
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231   0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475   2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464    1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
        stroke="white"
      />
    </svg>
  </div>
);

const Button = ({onSubmit, text, loading = false, disabled, value, betBtn, validValue, c="btn-primary" }) => {
  //console.log(validValue);
  
  return (
    // <button
    //   id={betBtn}
    //   className={
    //     Number(value) >= 10
    //       ? "btn btn-primary w-100 p-2 fs-4 opacity-75 mt-3 submit-btn1"
    //       : "btn btn-primary w-100 p-2 fs-4 opacity-25 mt-3 disabled"
    //   }
    //   onClick={onSubmit}
    //   // className="submit-btn form-login-btn w-100 mt-4 mb-3"
    //   disabled={disabled}
    // >
    //   {!loading ? text : <Loader className="spinner" />}
    // </button>

    <button
    id={betBtn}
      className={
        Number(value) >= Number(validValue) && !loading
          ? `btn ${c} w-100 p-2 fs-4 opacity-75 mt-3 submit-btn1`
          : `btn  ${c} w-100 p-2 fs-4 opacity-25 mt-3 text-warning disabled`
      }
    disabled={disabled}
    onClick={onSubmit}
    
  >
    {!loading ? text : "Loading..."}
    {/* {!loading ? text : <Loader className="spinner" />} */}
  </button>

  );
};

export default Button;

//   const App = () => {
//     const [showLoader, setShowLoader] = React.useState(false)

//     const onSubmit = () => {
//       setShowLoader(true)
//       setTimeout(() => setShowLoader(false), 1000)
//     }

//     return (
//       <Button
//         text="Submit"
//         onSubmit={onSubmit}
//         loading={showLoader}
//         disabled={showLoader}
//       />
//     )
//   }

//   ReactDOM.render(<App />, document.getElementById('root'));
