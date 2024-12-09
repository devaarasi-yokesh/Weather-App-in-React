import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, useLocation, data } from 'react-router-dom';
import 'axios';
import './App.css'



function OutputVal(props){

 
  
  return(
    <>
    <div className='output'>
        <p>{props.count}</p>
        <p>{props.place}</p>
    </div>
    </>
  )
}

function SearchBar({sendData}){
  const myRef = useRef(null);
  const [search,setSearch] = useState("");

  function handleClick(){
    setSearch(myRef.current.value);
    // console.log(search,myRef.current.value)
    sendData(myRef.current.value);
  }
  
  return(
    <>
    <div className='outputContainer'>
    <input type="text" ref={myRef}/>
    <button onClick={handleClick}>Search</button>
    </div>
    </>
  )
}

 
  
 
  


function App() {
  const [count, setCount] = useState("");
  const [place, setPlace] = useState("");
  const [dataFromChild,setDataFromChild] = useState('');

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
    console.log(dataFromChild,"data")
  }
  
    
    useEffect(() => {
      
      fetch(`http://api.weatherapi.com/v1/current.json?key=3336c9b4ec35432e9dc163558240912&q=${dataFromChild}&alerts=yes`)
        .then((response) => response.json())
        .then((data)=> { console.log(data,data.current.temp_c);
          setCount(data.current.temp_c);
          setPlace(data.location.name);
        })
        .catch((err) => {
          console.log(err.message);
        });
      
    },[dataFromChild])
  
  return (
    <>
      <SearchBar sendData={handleDataFromChild}/>
      <OutputVal count={count} place={place}/>
    </>
  )
}

export default App
