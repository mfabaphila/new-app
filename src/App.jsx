import { useState, useEffect } from "react"
import "./App.css"

export default function App(){
const [name,setName]=useState("")
const [email,setEmail] = useState("")
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [nameError, setNameError] = useState("");
const [emailError, setEmailError] = useState("");
const [usernameError, setUsernameError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [loginError, setLoginError] = useState("")
const [time, setTime]=useState(null)
const [weather, setWeather] = useState(null)

useEffect(() => {
  fetch("https://worldtime.timezone.io/api/timezone/Africa/Johannesburg")
    .then((results) => {
      if (!results.ok) throw new Error("API Error");
      return results.json();
    })
    .then((timeData) => {
      setTime(timeData.datetime.slice(0, 16));
    })
    .catch(() => setTime("API Error"));
}, []);

const loginUser =()=>{
  if(validation()===true){
  
login()
  }
}

const validation =()=>{
 
  if(name===""){
    setNameError("name is required")
    return false
  }
  if(email===""){
    
  setEmailError("email is required")
  return false
}

if(username===""){

  setUsernameError("username is required")
  return false
}

if(password===""){
 
  setPasswordError("password is required")
  return false
}
return true
}

const login = ()=>{
  if(username==="phila" && password==="1234"){
    setLoginError(`WELCOME ${name}, logging in`)
    return false;
 
  }
     else{
      setLoginError("Incorrect Credentials") 
    }
}

useEffect(()=>{
  fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.9258&longitude=18.4232&current=temperature_2m")
  .then((results)=>results.json())
  .then((data)=>{
    setWeather(data.current.temperature_2m + "°C")
  })

},
  [])

 return(
<>

<h1>WELCOME</h1>
<p>{weather}</p>
<p id="time">{time}</p>
<div className="login"> 

<fieldset className="main">
  <legend>Enter Your details to Login</legend>

  <label>Name</label>
  <input
  type ="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e)=>{setName(e.target.value); setNameError("")}}
  />
  <p>{nameError}</p>

  <label>Email</label>
  <input
  type="text"
  placeholder="Enter an email"
  value={email}
  onChange={(e)=>{setEmail(e.target.value);setEmailError("")}}
  
  />
  <p>{emailError}</p>

  <label>Username</label>
<input
  type="text"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => {setUsername(e.target.value);  setUsernameError("")}}
/>
<p>{usernameError}</p>
<label>Password</label>
<input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => {setPassword(e.target.value); setPasswordError("")}}
/>
<p>{passwordError}</p>

<button onClick ={loginUser}>Login</button>
<p id="loginMessage">{loginError}</p>
</fieldset>

</div>
</>

 )

}
