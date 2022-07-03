const express = require("express");
require('./db/conn'); 
const Student = require('./models/student')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

//create a new student

app.post("/students", async(req ,res)=>{
    try{
        const user = new Student(req.body);
        const createUser =  await user.save();
        res.status(201).send(createUser)   
        res.send("this is student response")
    }catch(e){
        res.status(400).send(e);
    }
   
});

// getting the data

app.get("/students" , async(req ,res)=>{
    try{
        const user = await Student.find();
        res.send(user)
        // console.log(user);
        
    }
    catch(e){
        console.log(e);
    }
})

// individual person data finding..
app.get("/students/:id" , async (req , res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        // console.log(studentData)
        

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData)
        }
        
    } catch (error) {
        console.log(error)
    }
})

//personal update 
app.patch("/students/:id", async(req , res) => {
    try {
        const _id = req.params.id;
        
        const updateData = await Student.findByIdAndUpdate(_id , req.body,{
            new :true
        });
        res.send(updateData)
        console.log(updateData)
        
    } catch (error) {
      res.status(400).send(e);   
    }
})

//delete id
app.delete("/students/:id" , async(req,res)=> {

    try {
        const id = req.params.id;
        const studentDelete =  await Student.findByIdAndDelete(id);
        console.log(studentDelete);  
    } catch (error) {
        console.log(error)    
    }

})
app.listen(port , ()=> {
    console.log(`connection is setup at ${port}`);
});