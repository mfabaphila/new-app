import { useState, useEffect } from "react"
import "./App.css"

export default function App(){
  const [grade, setGrade] = useState("")
  const [classRoom, setClassRoom] = useState("");
const [date, setDate] = useState("");
const [name, setName] = useState("");
const [reward, setReward] = useState("");
const [rewards, setRewards] =useState(
JSON.parse(localStorage.getItem("rewards"))||[])


const addReward = ()=>{
  if(reward===""){
    return
  }
  const newReward={
   grade:grade,
   classRoom:classRoom,
   date:date,
   name:name,
   reward:reward

  }
  const updatedReward = [...rewards, newReward]
  setRewards(updatedReward)
  setReward("")
  localStorage.setItem("rewards", JSON.stringify(updatedReward))
}


return(
<>
<h1 style={{color:"wheat"}}>School Reward Chart</h1>

<label>Grade</label>
<select value = {grade} onChange ={(e)=>setGrade(e.target.value)}>
  <option value = "noSelect">Select a grade</option>
  <option value= "Grade 1">Grade 1</option>
<option value="Grade 2">Grade 2</option>
  <option value="Grade 3">Grade 3</option>
  <option value="Grade 4">Grade 4</option>
  <option value="Grade 5">Grade 5</option>
  <option value="Grade 6">Grade 6</option>
  <option value="Grade 7">Grade 7</option>
       </select>
<label>CLASS</label>
       <select value={classRoom} onChange={(e)=>setClassRoom(e.target.value)}> 
      
        <option value = "noSelect">Choose a class</option>
        <option value ="A">A</option>
        <option value ="B">B</option>
<option value ="C">C</option>
<option value ="D">D</option>

 </select>
<label>Date of the Reward</label>
 <input 
 type = "date"
 value ={date}
 placeholder="Pick a date"
 onChange = {(e)=>setDate(e.target.value)}
 />
 <label>Type student Name</label>
 <input 
 type = "text"
 value ={name}
 placeholder="Type a name"
 onChange = {(e)=>setName(e.target.value)}
 />

 <label>Type of Reward</label>
 <select value ={reward} onChange={(e)=>setReward(e.target.value)}>
 <option value = "">Choose a Reward</option>
<option value="Merit">Merit</option>
<option value="House Points">House Points</option>
<option value="Free time">Free time</option>
<option value="Chrome book time">Chrome book time</option>
</select>
<button onClick ={addReward}>Add Reward</button>

<table>
  <thead>
    <tr>
      <th>Grade</th>
       <th>Class</th>
        <th>Date</th>
         <th>Name</th>
          <th>Reward</th>
    </tr>
  </thead>

  <tbody>
{rewards.map((item, index)=>(
  <tr key ={index}>
<td>{item.grade}</td>
 <td>{item.classRoom}</td>
  <td>{item.date}</td>
<td>{item.name}</td>

  <td>{item.reward}</td>
 

  </tr>
)

)}
  </tbody>


</table>

</>


)
}









// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

 function LoginPaused(){
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
const [exchange, setExchange]= useState(null)


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

  useEffect(()=>{
    fetch("https://open.er-api.com/v6/latest/USD")
    .then((results)=>results.json())
    .then((data)=>{
      setExchange(data.rates.ZAR.toFixed(2))
    })
  },
    
    [])

 return(
<>

<h1>The Reward Chat</h1>
<div className="APIs"> 
<p>{weather}</p>
<p id="time">{time}</p>
<p style={{color:"brown"}}>R1:{exchange}$</p>
</div>
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
