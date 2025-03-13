import React, { useContext, useEffect, useState } from 'react';
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
import { DataContext } from "../APIs/Api";
import { use } from 'react';





const Transaction = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { setResult } = useContext(DataContext);

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
  const [options, setOptions] = useState();

  console.log({options});
  
  useEffect(() => {

    API.getCurrency()
    .then((result) => {
      //console.log(result);
      // setOptions(result.currency_options)

      // console.log({options});

      if(result.currency_options) {
       setOptions(result.currency_options)
        
      } else {
        setOptions({
          'USD':{
              'symbol':'$',
              'name':'Dollar',
              'code':'USD',
              'rate':1
          },
          'IDR':{
              'symbol':'Rp',
              'name':'Indonesian Rupiah',
              'code':'IDR',
              'rate':16000
          },
          'MMK':{
              'symbol':'K',
              'name':'Myanmar',
              'code':'MMK',
              'rate':2000
          },
          'XOF':{
              'symbol':'CFA',
              'name':'African CFA franc',
              'code':'XOF',
              'rate':600
          },
          'PKR':{
              'symbol':'Rs',
              'name':'Pakistani Rupee',
              'code':'PKR',
              'rate':300
          },
          'KES':{
              'symbol':'KES',
              'name':'Kenyan Shilling',
              'code':'KES',
              'rate':130
          },
          'NGN':{
              'symbol':'₦',
              'name':'Nigeria Naira',
              'code':'NGN',
              'rate':1000
          },
          'UGX':{
              'symbol':'UGX',
              'name':'Uganda Shilling',
              'code':'UGX',
              'rate':3000
          },
          'VND':{
              'symbol':'₫',
              'name':'Vietnamese Dong',
              'code':'VND',
              'rate':25000
          },
          'ZMW':{
              'symbol':'ZK',
              'name':'Zambian Kwacha',
              'code':'ZMW',
              'rate':26
          },
          'UZS':{
              'symbol':'лв',
              'name':'Uzbekistani Som',
              'code':'UZS',
              'rate':12800
          },
          'GHS':{
              'symbol':'₵',
              'name':'Ghanaian Cedi',
              'code':'GHS',
              'rate':15
          },
          'RUB':{
              'symbol':'₽',
              'name':'Russian Ruble',
              'code':'RUB',
              'rate':90
          },
          'BRL':{
              'symbol':'R$',
              'name':'Brazilian Real',
              'code':'BRL',
              'rate':6
          }
      
      })
      }
      
    })
    .catch((err) => {
      console.log(err);
      setOptions({
        'USD':{
            'symbol':'$',
            'name':'Dollar',
            'code':'USD',
            'rate':1
        },
        'IDR':{
            'symbol':'Rp',
            'name':'Indonesian Rupiah',
            'code':'IDR',
            'rate':16000
        },
        'MMK':{
            'symbol':'K',
            'name':'Myanmar',
            'code':'MMK',
            'rate':2000
        },
        'XOF':{
            'symbol':'CFA',
            'name':'African CFA franc',
            'code':'XOF',
            'rate':600
        },
        'PKR':{
            'symbol':'Rs',
            'name':'Pakistani Rupee',
            'code':'PKR',
            'rate':300
        },
        'KES':{
            'symbol':'KES',
            'name':'Kenyan Shilling',
            'code':'KES',
            'rate':130
        },
        'NGN':{
            'symbol':'₦',
            'name':'Nigeria Naira',
            'code':'NGN',
            'rate':1000
        },
        'UGX':{
            'symbol':'UGX',
            'name':'Uganda Shilling',
            'code':'UGX',
            'rate':3000
        },
        'VND':{
            'symbol':'₫',
            'name':'Vietnamese Dong',
            'code':'VND',
            'rate':25000
        },
        'ZMW':{
            'symbol':'ZK',
            'name':'Zambian Kwacha',
            'code':'ZMW',
            'rate':26
        },
        'UZS':{
            'symbol':'лв',
            'name':'Uzbekistani Som',
            'code':'UZS',
            'rate':12800
        },
        'GHS':{
            'symbol':'₵',
            'name':'Ghanaian Cedi',
            'code':'GHS',
            'rate':15
        },
        'RUB':{
            'symbol':'₽',
            'name':'Russian Ruble',
            'code':'RUB',
            'rate':90
        },
        'BRL':{
            'symbol':'R$',
            'name':'Brazilian Real',
            'code':'BRL',
            'rate':6
        }
    
    })
    
    }
    )
  }, [])

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
      //console.log("Transaction",result);
      setIsLoading(false)
      if(result.detail){
       Cookies.remove("auth-token")
        navigate("/login")
        
      } else if(result) {
       // setResult(result);
        setData(result);
        setIsLoading(false)
        
        //console.log(result);
        
      }
    })
    .catch(err => console.log("Error", err))
  }

  useEffect(()=> {
    handleSearch(value);
  }, [value])


  //console.log(data);
  const transactionCard = data.map(e => {
      let cs;
      if(options !== undefined) {
        cs = options[e.currency].
        symbol;
        //console.log({cs});
        
      }
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
        id={e.sessionID} type={e.type} amount={numberWithCommas(Number(e.amount).toFixed(2))} date={e.timestamp} status={e.status} currency={cs !== undefined ? cs : ""}
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