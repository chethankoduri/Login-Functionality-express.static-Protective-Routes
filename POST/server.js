const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded());
 app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage })


app.post("/signup", upload.single("profilePic"),async(req,res)=>{
console.log(req.body);
console.log(req.file);



try {
  let newUser = new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    email:req.body.email,
    password: req.body.password,
    mobileNo: req.body.mobileNo,
    profilePic: req.file.path
  });

  await newUser.save();
  
  res.json({status:"success",msg:"user created sucessfull"});
} catch (err) {
  res.json({status:"failure",msg:"unable to create user", error:err});
  console.log(err)
}
});

app.post("/login",upload.none(),async(req,res)=>{
  console.log(req.body);
  
  let result = await User.find().and([{email:req.body.email}]);
  
  if(result.length >0){
    if(result[0].password == req.body.password){
  
      let dataToSend = {
        firstName:result[0].firstName,
        lastName:result[0].lastName,
        age:result[0].age,  
        email:result[0].email,
        mobileNo:result[0].mobileNo,
        profilePic:result[0].profilePic
  
      }
  
   res.json({status:"success",data: dataToSend})
  
    }else {
      res.json({status:"failure",msg:"Invalid Password"}); 
    }
  
  }else{
    res.json({status:"failure",msg:"Invalid Email"});
  }
  
  });

app.listen(2222,()=>{
    console.log("Listening to Port 2222");
});

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic:String
});

let User = new mongoose.model("users",userSchema,"users");

let connectToMDB = async()=>{

  try {
   await mongoose.connect("mongodb+srv://chethankoduri:chethan@chethan.ifthz.mongodb.net/?retryWrites=true&w=majority&appName=chethan");
    console.log("sucessfully connected to MDB");
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};
connectToMDB();