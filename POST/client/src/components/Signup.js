import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';


function Signup() {

let firstNameInputRef = useRef();
let lastNameInputRef = useRef();
let ageInputRef = useRef();
let emailInputRef = useRef();
let passwordInputRef = useRef();
let mobileNoInputRef = useRef();
let profilePicInputRef = useRef();

let[selectedImage, setSelectedImage] = useState("./images/No_Image_Available.jpg");

// let onSignupUsingJSON = async ()=>{
    // let dataToSend = {
    // firstName:firstNameInputRef.current.value,
//     lastName:lastNameInputRef.current.value,
//     age:ageInputRef.current.value,
//     email:emailInputRef.current.value,
//     password:passwordInputRef.current.value,
//     mobileNo:mobileNoInputRef.current.value,
//     profilePic:profilePicInputRef.current.file
// };
// console.log(dataToSend);

//  let dataToSendJSON = JSON.stringify(dataToSend);
//  console.log(dataToSendJSON);

// let myHeaders = new Headers();
//  myHeaders.append("content-type","application/json");

// let reqOptions = {
// method:"POST",
// body: dataToSendJSON,
// headers: myHeaders,
// };
// try{
// let JSONData = await fetch("http://localhost:2222/signup",reqOptions);

// let JSOData = await JSONData.json();
// console.log(JSOData);
// alert(JSOData.msg);
// }catch(error) {
// console.log(error)
// }
// };

// let onSignupUingURLE = async ()=>{

//     let dataToSend = new URLSearchParams();

//     dataToSend.append("firstName",firstNameInputRef.current.value);
//     dataToSend.append("lastName",lastNameInputRef.current.value);
//     dataToSend.append("age",ageInputRef.current.value);
//     dataToSend.append("email",emailInputRef.current.value);
//     dataToSend.append("password",passwordInputRef.current.value);
//     dataToSend.append("mobileNo",mobileNoInputRef.current.value);
//     dataToSend.append("profilePic",profilePicInputRef.current.value);

//     let myHeaders = new Headers();
//      myHeaders.append("content-type","application/x-www-form-urlencoded");

//     let reqOptions = {
//     method:"POST",
//     body: dataToSend,
//     headers: myHeaders,
// };
// try{
//    let JSONData = await fetch("http://localhost:2222/signup",reqOptions);

//    let JSOData = await JSONData.json();
//    console.log(JSOData);
//    alert(JSOData.msg);
// } catch (error) {
//     console.log(error);
// }
// };   

let onSignupUsingFD = async ()=>{

    let dataToSend = new FormData();

    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",mobileNoInputRef.current.value);

 for(let i=0;i<profilePicInputRef.current.files.length;i++){
    dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
 }
    let reqOptions = {
    method:"POST",
    body: dataToSend,
};
try{
 let JSONData = await fetch("http://localhost:2222/signup",reqOptions);

 let JSOData = await JSONData.json();
 console.log(JSOData);
 alert(JSOData.msg);
} catch (error) {
 console.log(error);
}
};
  return (
    <div className='App'>
        <form>
            <h2>Sign Up</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef}></input>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <label>Mobile No</label>
                <input ref={mobileNoInputRef}></input>
            </div>
            <div>
                <label>Profile Pic</label>
                <input ref={profilePicInputRef} type='file' onChange={(e)=>{

            let selectedImageURL= URL.createObjectURL(e.target.files[0]);
            setSelectedImage(selectedImageURL);

                }}></input>
                <br></br>
                <img src={selectedImage} className='profilePicPreview'></img>
            </div>
            <div>
                <button type="button" onClick={()=>{
                onSignupUsingFD();
                }}
                >
                SignUp(FD)
                </button>

            </div>
        </form>
        <br></br>
        <br></br>
        <br></br>
    <Link to="/">Login</Link>
    </div>
  );
}
export default Signup;