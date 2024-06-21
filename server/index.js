const express = require("express");
const cors = require("cors");
const {connectDB} = require("./connection");
const app =express();
const port = 3001;
const Notepost = require("./models/notepost");

//connect database
connectDB();


//middleware
app.use(express.json());
app.use(cors());

//routes
app.post("/post-notes",async(req,res)=>{
    let note = new Notepost({
         title :req.body.title,
    description : req.body.description,
    
    });
    await note.save();
   
    
    res.json({message :"Note added successfully",
    note:note});
});


//GEt all blogs

app.get("/get-notes",async(req,res)=>{
    let notes = await Notepost.find();
    if(!notes){
        res.status(404), res.json({message:"No notes found"});
    }else{
        res.json({notes });
    }       
});


//delete blog
app.delete("/delete-notes/:id", async(req,res)=>{
    let note = await Notepost.findByIdAndDelete(req.params.id);
    if(!note){
        res.status(200), res.json({message:"No notes found"});
    }else{
        res.json({message :"Note deleted successfully",
        note:note});
    }
})

    // update blog

    app.put("/update-notes/:id", async(req,res)=>{
        let note = await Notepost.findByIdAndUpdate(req.params.id);
        if(!note){
            res.status(404), res.json({message:"No notes found"});
        }
        else if(!req.body.title && !req.body.description){
           res.json({message:"Please provide title and description"});
        }
        else if(req.body.title){
            note.title = req.body.title;
        }
        else if(req.body.description){
            note.description = req.body.description;
        }
        else{
            note.title = req.body.title;
            note.description = req.body.description;
        }
        await note.save();
        res.status(200), res.json({message :"Note updated successfully",
        note:note});
    })

// listen
app.listen(port,()=>console.log(`server is running on port ${port}`))