const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const schemaData = mongoose.Schema({
  firstName:String,
  lastName:String,
  gender:String,
  address1:String,
  address2:String,
  city:String,
  country:String,
  zip:String, 
  email:String,
  phone:String,
},{
timestamps : true,
})

const userModel = mongoose.model("user",schemaData);



//read
//http://localhost:8080/
app.get("/",async(req,res)=>{
  const data = await userModel.find({})
  res.json({success: true, data: data})
})

//create
//http://localhost:8080/create
app.post ("/create",async(req,res)=>{
  console.log(req.body)
  const data = new userModel(req.body)
  await data.save()
  res.send({success: true, message:"data created successfully",data: data})
})

//update
//http://localhost:8080/update
// Update user data
app.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Use findByIdAndUpdate to update the user document
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
});



//delete
//http://localhost:8080/delete/id
app.delete ("/delete/:id",async(req,res)=>{
  const id = req.params.id
  console.log(id)
  const data = await userModel.deleteOne({_id : id})
  res.send({success: true, message:"data deleted successfully",data:data})

})


mongoose.connect("mongodb://localhost:27017/contactstodo")
.then(()=>{
  console.log("connected to DB")
app.listen(PORT,() =>console.log(`server is running on ${PORT}`))
})
.catch((err)=>console.log(err))

