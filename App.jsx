import { useState, useRef, useEffect } from 'react';
import weather from './assets/weather.png';
import { BrowserRouter as Router, useNavigate, useLocation, data } from 'react-router-dom';
import 'axios';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


function OutputVal(props){

 
  
  return(
    <>
    <div className='output mt-5'>
        <div className='row mt-5 mb-5'>
        <div className='col-md-6 m-4'>
        <p className='h1 bolder'>{props.count}°C</p>
        <p className='h6'>{props.weather}</p>
        <p className=''>Wind: {props.wind}&nbsp;km/h</p>
        </div>
        <img src={props.img} alt="" className='col-md-3' />
        </div>
        <p className='h2'>{props.place}</p>
        <p className='h4'>{props.country}</p>
        <p className='h6'>{props.time}&nbsp;&nbsp;{props.timeZone}</p>
    </div>
    <div className='row container'>
    <div className='col-md-6'>
    <img src='./public/sun.png' alt="" style={{width:"50px",height:"50px",margin:"20px"}} />
    <p>Sunrise:&nbsp;{props.sunrise}</p>
    <p>Sunset:&nbsp;{props.sunset}</p>
    </div>
    <div className='col-md-6'>
    <img src='./public/moon.png' alt="" style={{width:"50px",height:"50px",margin:"20px"}} />
    <p>Moonrise:&nbsp;{props.moonrise}</p>
    <p>Moonset:&nbsp;{props.moonset}</p>
    </div>
    </div>
    </>
  )
}

function SearchBar({sendData}){
  const myRef = useRef(null);
  const [search,setSearch] = useState("");

  function handleClick(){
    if(!myRef.current.value){
      window.alert("Enter any city name");
    }
    setSearch(myRef.current.value);
    // console.log(search,myRef.current.value)
    sendData(myRef.current.value);
  }
  
  return(
    <>
    <div className='container mt-5 row'>
    <input type="text" ref={myRef} onKeyDown={(e) => (e.key === 13 ? this.handleClick() : null)} className='col-md-9' placeholder="Enter a city name"/>
    <button onClick={handleClick} className='col-md-2 p-1 m-2'>search</button>
    </div>
    </>
  )
}

function Header(){
  return(
<div className='header'>
<h1 >Weather Forecast</h1>
</div>
  ) 
}
  
 
  


function App() {
  const [count, setCount] = useState("5");
  const [place, setPlace] = useState("London");
  const [img, setImage] = useState("url(./assets/weather.png)");
  const [wind, setWind] = useState("12 km/h");
  const [weather, setWeather] = useState("Clear");
  const [time,setTime] = useState("10:23");
  const [country, setCountry] = useState("United Kingdom");
  const [timeZone, setTimeZone] = useState("Europe/United Kingdom");
  
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [moonrise, setMoonrise] = useState("");
  const [moonset, setMoonset] = useState("");
  const [dataFromChild,setDataFromChild] = useState('');

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
    console.log(dataFromChild,"data")
  }
  
    
    useEffect(() => {
     Promise.all([
      fetch(`http://api.weatherapi.com/v1/current.json?key=3336c9b4ec35432e9dc163558240912&q=${dataFromChild}&alerts=yes`)
      .then((res) => res.json()),
      fetch(`http://api.weatherapi.com/v1/astronomy.json?key=3336c9b4ec35432e9dc163558240912&q=${dataFromChild}&dt=2024-12-10
`) .then((res) => res.json()),
     ])
     .then(([data1Response, data2Response]) => {
      setCount(data1Response.current.temp_c);
      setPlace(data1Response.location.name);
      setImage(data1Response.current.condition.icon);
      setWeather(data1Response.current.condition.text);
      setWind(data1Response.current.wind_kph);
      setTime(data1Response.location.localtime);
      setCountry(data1Response.location.country);
      setTimeZone(data1Response.location.tz_id);
      setSunrise(data2Response.astronomy.astro.sunrise);
      setSunset(data2Response.astronomy.astro.sunset);
      setMoonrise(data2Response.astronomy.astro.moonrise);
      setMoonset(data2Response.astronomy.astro.moonset);
      console.log(data2Response)
     })
     
        .catch((err) => {
          console.log(err.message);
        });
        
      
    },[dataFromChild])
  
   
  return (
    <>
      <Header />
      <SearchBar sendData={handleDataFromChild}/>
      <OutputVal count={count} place={place} img={img} weather={weather} wind={wind} country={country} 
      time={time.match(/\d+:\d+/)} timeZone={timeZone} sunrise={sunrise}sunset={sunset} moonrise={moonrise}moonset={moonset}/>
    </>
  )
}

export default App
