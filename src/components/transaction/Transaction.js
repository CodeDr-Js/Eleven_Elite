import React, { useEffect, useState } from 'react';
import "./index.css";
import "../color/color.css";
import TransactionHeader from './transactionHeader';
import TransactionCard from './transactionCard';
import MySelect from '../mySelect/MySelect2';
import { API } from '../api-service/api-service';
import Cookies  from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import NoData from '../noData/noData';
import Footer from '../Home/anti-scores/footer';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import DateRangePicker from './DateRangePicker';
import { addHours, numberWithCommas } from '../qickfun/qickfun';
import { DateTime } from 'luxon';






const Transaction = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function convertToServerTime(userDate) {
    // Convert the user-selected date to a DateTime object
    const userDateTime = DateTime.fromISO(userDate);
    
    // Convert to Africa/Lagos timezone
    const serverTime = userDateTime.setZone('Africa/Lagos');
    
    return serverTime.toISO(); // Return in ISO format for backend
  }


  const navigate = useNavigate();
  const token = Cookies.get("auth-token");

  function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);
  
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
  
    // Return formatted date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }


  const [value, setValue] = useState({
    // start: getFormattedDate(),
    start: addHours(new Date(), 24*7, "remove").toJSON(),
    stop: getFormattedDate(),
    transaction_type: "all",
    time_zone: userTimeZone
  });

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("transaction")
  const [dateRange, setDateRange] = useState([]);
 

  useEffect(() => {
    
    if (!token) {
      navigate("/login");
    
    } else {
     
    }
  }, [token]);

  function getFormattedDate() {
    // const currentDate = new Date();
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the correct month index (January is 0)
    // const day = String(currentDate.getDate()).padStart(2, '0');
    // const year = currentDate.getFullYear();
    // return `${month}/${day}/${year}`;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to get the correct month index (January is 0)
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }



  const handleSearch = (values) => {
    //console.log("The values are", values);
    setIsLoading(true);
    API.transaction(`?start=${values.start}&transaction_type=${values.transaction_type}&stop=${values.stop}`, token)
    .then((result) => {
      console.log("Transaction",result);
      setIsLoading(false)
      if(result.detail){
       Cookies.remove("auth-token")
        navigate("/login")
        
      } else if(result) {
        setData(result);
        setIsLoading(false)
        
        
      }
      //console.log(result);
    })
    .catch(err => console.log("Error", err))
  }

  useEffect(()=> {
    handleSearch(value);
  }, [value])


  //console.log(data);
  const transactionCard = data.map(e => {
      // if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // } else if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // } else if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // } else if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // }
      return (
        <TransactionCard key={e.id}
        id={e.sessionID} type={e.type} amount={numberWithCommas(Number(e.amount).toFixed(2))} date={e.timestamp} status={e.status} currency={e.currency}
        />
      )
    })
  

  return (
    <>
      {activeButton === "transaction" ? ( <div className='mb-5 pb-3'>
    <div className='fixed-top container'>
    <TransactionHeader handleSearch={handleSearch} setValue={setValue} isLoading={isLoading}/>
    </div>

    {/* <DateRangePicker /> */}

   
    
    <div className='' style={{marginTop:"0", marginBottom:"60px"}}>
    {data[0] ? <div className='transaction-div'>{transactionCard }</div>: (<NoData/>) }
    
    {/* <div className='mb-5'>
      <label>Select Date Range:</label>
      <Flatpickr
        value={dateRange}
        options={{
          mode: "range", // Enables selecting two dates
          dateFormat: "Y-m-d",
        }}
        onChange={(selectedDates) => setDateRange(selectedDates)}
        c lassName="border p-2 rounded"
      />
      <p>Selected Range:{dateRange.length ? dateRange.join(" to ") : "None"}</p>
    </div> */}
    </div>

    {/* <MySelect/> */}
      
    
    <Footer activeButton={activeButton} setActiveButton={setActiveButton} />
    </div>) : navigate(`/${activeButton}`)}

  
    </>
   
  )
}

export default Transaction