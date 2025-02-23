import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dropdown.css"
import { API } from "../api-service/api-service";

const CustomDropdown = ({selectedValue, setSelectedValue, isOpen, setIsOpen, handleSelect, icon, setIcon}) => {

  const [options, setOptions] = useState(null);
  const currency = () => {
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
  }

  useEffect(()=>{
    currency();
  },[])
  
  // Options

//console.log("Options is:", options);


const setCurrency = (e) => {
    e.preventDefault() ;
    setIsOpen(!isOpen)
}



  return (
    <div className="dropdown-container">
      {/* Dropdown Button */}
      <button
        className={`dropdown-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={setCurrency}
      >
        {selectedValue ? `Selected: ${icon} - ${selectedValue}` : "Select Currency"}
        <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="dropdown-menu-custom">
          {options !== null ? Object.entries(options).map(([key,value]) => (
            <li key={key} onClick={() => handleSelect(key, value.symbol)}>
              {value.name}
            </li>
          )):""}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
