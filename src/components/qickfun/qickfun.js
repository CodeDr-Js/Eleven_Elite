import { LazyLoadImage } from "react-lazy-load-image-component";

export function numberWithCommas(x) {
  return parseFloat(x)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toTitleStr(str) {
  try {
    let [a, b] = str[0].toUpperCase();
    b = a + str.slice(1);
    return b;
  } catch (e) {
    return str;
  }
}
export function CalculateStartDiff(countDownDate, now = new Date()) {
  let [days, hours, minutes, seconds] = [];
  if (!countDownDate) {
    countDownDate = now;
  }
  //console.log(countDownDate);
  var distance = countDownDate - now;
  var expired = distance < 0;

  if (expired) {
    [days, hours, minutes, seconds] = [0, 0, 0, 0];
  } else {
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  var counter = {
    days: `${days}d:`,
    hours: `${hours}h:`,
    minutes: `${minutes}m:`,
    seconds: `${seconds}s`,
  };
  var dhms = {
    days: `${days}`,
    hours: `${hours}`,
    minutes: `${minutes}`,
    seconds: `${seconds}`,
  };
  if (days < 1) {
    delete counter["days"];
    dhms["days"] = 0;
  }
  //   days < 1 ?[ delete (counter['days']),dhms['days']=0] : 0;
  return { counter, distance, dhms, expired };
}
export function getMinDiff(startDate, endDate = new Date()) {
  const msInMinute = 60 * 1000;
  return Math.round(Math.abs(endDate - startDate) / msInMinute);
}
export function padNum(num, targetLength = 2) {
  return num.toString().padStart(targetLength, 0);
}
export function addHours(date, hours, action = "add") {
  if (action === "remove") {
    date.setHours(date.getHours() - hours);
  } else {
    date.setHours(date.getHours() + hours);
  }
  return date;
}

export function range(start, end) { return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start); }

export function formatDateAndTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  
  const date = dateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const time = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const newDate = date + " " + time
  return newDate;
}

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function getRealTimeDate(){
  // let e = await fetch('http://worldtimeapi.org/api/ip')
  // return e.json()
  return {
      'timzone':'America/Los_Angels',
      'datetime':new Date()
  }
}

export function AddImg(ImageUrl,properties, id) {
  let [width,height,alt]=properties
  if(!alt){alt='📷'}
  if (!ImageUrl){
    ImageUrl='https://media.api-sports.io/football/teams/15630.png'
  }
  return (
    <span className="export function me-2 rounded-circle" id={id}>
      <LazyLoadImage src={ImageUrl}
        width={width} height={height}
        alt={alt}
      />
     </span>
  );
}

export function handleCopyNew(text, setMessage
) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Wallet address successfully copied to clipboard");
      })
      .catch((err) => {
        setMessage("Failed to copy text");
        console.error("Failed to copy text: ", err);
      })
};

export function convertToLocalTime(utcString) {
  const date = new Date(utcString);
  return date.toLocaleString(); // Returns the date/time in the user's local timezone
}

export function serverTime(date=new Date(),tzString='Africa/Lagos') {return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));}

export function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return interval === 1
        ? `${interval} ${unit.name} ago`
        : `${interval} ${unit.name}s ago`;
    }
  }

  return "just now";
}

export function formatDate(isoString) {
  const date = new Date(isoString);

  // Get day of the week
  const options = { weekday: 'long', month: 'long' };
  const dayOfWeek = date.toLocaleDateString('en-US', options).split(' ')[0];

  // Get day, month, and year
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getUTCFullYear();

  // Add suffix to the day (st, nd, rd, th)
  const daySuffix = (day % 10 === 1 && day !== 11) ? 'st' :
                    (day % 10 === 2 && day !== 12) ? 'nd' :
                    (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

  // Get time in HH:MM:SS format
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${dayOfWeek} ${day}${daySuffix} ${month} ${year} : ${hours}:${minutes}:${seconds}`;
}


export function handleCopy(text, message) {
  // const text = activities_g.deposit_dir.local_address[0].fields.account_number;
  //console.log(text);
  
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(message);
     // console.log("Copied...");
    })
    .catch((err) => {
      alert("Failed to copy text");
      console.error("Failed to copy text: ", err);
    });
};