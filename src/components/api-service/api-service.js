import { pathname } from "../search_dir/search_dir"
//console.log(pathname);


let Token='5e26b54473f0cce5a2e84a5a209ec5340ae2357e'
let url = 'https://rrtcc-4a28b26f2705.herokuapp.com/api/'
export class API {

    static loginUser(body){
        let endpoint='login/'
        return fetch(url+endpoint,{
            'method':'POST',
            'headers':{
            'Content-Type':'application/json',
            // 'Authorization':`Token ${Token}`
            },
            'body':JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }
    static setPin(body, Token){
        let endpoint='wallet/set_pin/'
        return fetch(url+endpoint,{
            'method':'POST',
            'headers':{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`
            },
            'body':JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }
    
    static withdraw(body, Token){
        let endpoint='wallet/withdraw/'
        return fetch(url+endpoint,{
            'method':'POST',
            'headers':{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`
            },
            'body':JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }
    
    static transaction(params, Token){
       console.log(params);
        let endpoint=`transaction/${params}`
        //console.log(endpoint);
        return fetch(url+endpoint,{
            'method':'GET',
            'headers':{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`
            }
        })
        .then(resp=>resp.json())
    }


    static registerUser(body){
        //console.log(body);
         let endpoint = "register/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             // 'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body),
         }).then((resp) => resp.json());
    }

    static forgetPassword(body){
        //console.log(body);
         let endpoint = "forgot-password/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             // 'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body),
         }).then((resp) => resp.json());
    }

    static logout(body){
       // console.log(body);
         let endpoint = "logout/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             // 'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body),
         }).then((resp) => resp.json());
    }

    static paynow(body, Token){
      // console.log(body);
        let endpoint = "betdir/paynow/";
        return fetch(url + endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization':`Token ${Token}`
          },
          body: JSON.stringify(body)
        }).then((resp) => resp.json());
   }

    static setSecure(body, Token){
       // console.log(body);
         let endpoint = "betdir/set_secure/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body)
         }).then((resp) => resp.json());
    }

    
    static sendRequest(body, Token, headers=null){
       // console.log(body);
         let endpoint = "wallet/send_request/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: !headers ? {
             "Content-Type": "application/json",
             'Authorization':`Token ${Token}`
           }: headers,
           body: JSON.stringify(body)
         }).then((resp) => resp.json());
    }

    static retrieveData(token){
         let page = pathname.replace('/', "");
         let endpoint = `retrieve-data/?req_date=${new Date().toJSON()}`;
        //  let endpoint = `retrieve-data/?req_date=${new Date('2025-02-16T01:09:30.420Z').toJSON()}`;
         return fetch(url + endpoint, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${token}`
           },
         }).then((resp) => resp.json());
    }
    static bankingAgent(params, token){
         let page = pathname.replace('/', "");
         let endpoint = `banking-agent/${params}`;
        //  let endpoint = `retrieve-data/?req_date=${new Date('2025-02-16T01:09:30.420Z').toJSON()}`;
         return fetch(url + endpoint, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${token}`
           },
         }).then((resp) => resp.json());
    }

    static retrieveHistory(token){
         let page = pathname.replace('/', "");
         let endpoint = `betdir/history/`;
         return fetch(url + endpoint, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${token}`
           },
         }).then((resp) => resp.json());
    }


    static retrieveDeposit(token){
         let page = pathname.replace('/', "");
         let endpoint = `wallet/deposit/`;
         return fetch(url + endpoint, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${token}`
           },
         }).then((resp) => resp.json());
    }

    static retrieveWitdrawal(token){
         let page = pathname.replace('/', "");
         let endpoint = `wallet/withdraw/`;
         return fetch(url + endpoint, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${token}`
           },
         }).then((resp) => resp.json());
    }

    static retrievePromotion(token){
         let page = pathname.replace('/', "");
         let endpoint = `promotion/teams/`;
         return fetch(url + endpoint, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${token}`
           },
         }).then((resp) => resp.json());
    }

    static fetchFixtures(body){
        
      let endpoint = "soccer/retrieve_fixtures/";
      return fetch(url + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Encoding': 'gzip'
          // 'Authorization':Token ${token}
        },
        body: JSON.stringify(body)
      }).then( async (resp) => resp.json())
 
    }

    static submitBanking(body, Token){
      //console.log(body);
      let endpoint = "banking-agent/";
       return fetch(url + endpoint, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
         body: JSON.stringify(body)
       }).then((resp) => resp.json());
  }

    static cancelTicket(body, Token){
      //console.log(body);
       let endpoint = "betdir/cancel_bet/";
       return fetch(url + endpoint, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
         body: JSON.stringify(body)
       }).then((resp) => resp.json());
  }


    static logout(Token){
      //console.log(body);
       let endpoint = "logout/";
       return fetch(url + endpoint, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }
    static notification(Token){
      //console.log(body);
       let endpoint = "notification/";
       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }
    static promotion(Token){
      //console.log(body);
       let endpoint = "promotion/teams/";
       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

    static invite(Token){
      //console.log(body);
       let endpoint = "promotion/invite_reward/"

       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }
    static task(Token){
      //console.log(body);
       let endpoint = "promotion/task/"

       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

    static pending(Token){
      //console.log(body);
       let endpoint = "promotion/pending_friends/"

       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

    static removeBonus(Token){
      //console.log(body);
       let endpoint = "settings/delete_bonus_key/"

       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

  static changePassword(body, Token){
    //console.log(body, Token);
     let endpoint = "settings/change_password/";
     return fetch(url + endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Authorization':`Token ${Token}`
       },
       body: JSON.stringify(body)
     }).then((resp) => resp.json());
}

  static changePin(body, Token){
     let endpoint = "wallet/change_transaction_pin/";
     return fetch(url + endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Authorization':`Token ${Token}`
       },
       body: JSON.stringify(body)
     }).then((resp) => resp.json());
}

  static redeem_gift(body, Token){
     let endpoint = "settings/redeem_gift/";
     return fetch(url + endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Authorization':`Token ${Token}`
       },
       body: JSON.stringify(body)
     }).then((resp) => resp.json());
}

  static local_payment(body, Token){
     let endpoint = "local-payment/";
     return fetch(url + endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Authorization':`Token ${Token}`
       },
       body: JSON.stringify(body)
     }).then((resp) => resp.json());
}

}