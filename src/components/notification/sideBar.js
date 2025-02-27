import React, { useState, useRef, useEffect, useContext } from 'react';
import './Sidebar.css';
import NotificationCardnew from './NotificationCardSlider';
import Cookies  from "js-cookie";
import { useNavigate } from "react-router-dom";
import { API } from "../api-service/api-service";
import { DataContext } from "../APIs/Api";

const Sidebar = ({notification}) => {
//console.log({notification});

  const navigate = useNavigate();
    const {  setActiveToken, result } =
        useContext(DataContext);
      const token = Cookies.get("auth-token");
    const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Handle clicks outside the sidebar to close it
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Allow scrolling
    }
  
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isOpen]);
  


//   useEffect(()=>{
//     if(result !== null) {
//         setIsOpen(true);
       
//     } else {
//         setIsOpen(false);
//     }
//   },[])

useEffect(() => {
    if (!token) {
      Cookies.remove("auth-token");
      navigate("/login");
      setActiveToken("");
    } else {
      setActiveToken(token);
    }
  }, [token]);

  useEffect(() => {
    if(notification !== null && notification[0]) {
     // console.log("running....");
      
      setIsOpen(true);
    } else {
        // API.notification(token)
        // .then((result) => {
        // //console.log(result);
        //   if (result.success) {
        //    setIsOpen(true);
        //     setNotification(result.activities.notification);
        //   } else {
        //     Cookies.remove("auth-token");
        //     navigate("/login");
        //   }
        // })
        // .catch((err) => console.log(err));
    }
   }, [notification])



   const unseen = notification !== null && notification[0] ? notification.map((item) => {
    return Object.entries(item).map(([key, value]) =>{
      return(
        <>
      <NotificationCardnew
        date={key}
        header={value.header}
        body={value.message}
      />
    </>

      ) 
      
   })
}) :""
   



   //console.log([unseen]);
   
    


  


  return (
    <div className=''>
      {/* Button to open the sidebar */}
      {/* <button className="btn btn-primary m-3" onClick={() => setIsOpen(true)}>
        Open Sidebar
      </button> */}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="sidebar-header vip-text-2">
          <h4>Notice!!!</h4>
          <button className="btn btn-light" onClick={() => setIsOpen(false)}>
            X
          </button>
        </div>
        {/* <div className="sidebar-content">
          <ul className="list-group">
            <li className="list-group-item">Item 1</li>
            <li className="list-group-item">Item 2</li>
            <li className="list-group-item">Item 3</li>
          </ul>
        </div> */}

        <div className='n-card'>

            {notification !== null  ? (notification[0] ? [unseen] : "") : ""}
           

        </div>
      </div>

      {/* Optional overlay (clicking this area will also close the sidebar) */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default Sidebar;
