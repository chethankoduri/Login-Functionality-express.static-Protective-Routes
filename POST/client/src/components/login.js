import React, { useRef} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Login() {

let emailInputRef = useRef();
let passwordInputRef = useRef();
let navigate = useNavigate();
let dispatch = useDispatch();


let onSignupUsingFD = async ()=>{
    let dataToSend = new FormData();
    
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    
    let reqOptions = {
    method:"POST",
    body: dataToSend,
};

 let JSONData = await fetch("http://localhost:2222/login",reqOptions);

 let JSOData = await JSONData.json();
 console.log(JSOData);

 if(JSOData.status=='failure'){
    alert(JSOData.msg);
 }else{
  dispatch({type:"login",data: JSOData.data}) ; 
 navigate("/dashboard");
 }

};
  return (
    <div className='App'>
        <form>
            <h2>Sign Up</h2>
            
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>password</label>
                <input ref={passwordInputRef}></input>
            </div>
            
            <div>
                <button type="button" onClick={()=>{
                onSignupUsingFD();
                }}
                >
               Login     
                </button>
            </div>
        </form>
        <br></br>
        <br></br>
        <br></br>
    <Link to="/signup">Signup</Link>
    </div>
  );
}
export default Login;