/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: _Harmandeep Singh_ Student ID: _169916210_ Date: _07-06-2023_
*
********************************************************************************/ 


const express = require("express");
const path = require("path");
const data = require("./modules/officeData.js");
const parser = require("body-parser");


const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(parser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/audio", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/audio.html"));
});

app.get("/video", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/video.html"));
});

app.get("/list", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/list.html"));
});

app.get("/table", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/table.html"));
});

app.get("/PartTimer", (req,res)=>{
    data.getPartTimers().then((data)=>{
        res.json(data);
    });
});

app.get("/employee/:employeeNum", (req,res)=>{
    data.getEmployeeByNum(req.params.employeeNum).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json({message:"no result"})
    });
});
app.get("/storefront", (req,res)=>{
    res.sendFile(path.join(__dirname, "./views/storefront.html"));
}   
);

app.use((req,res)=>{
    res.status(404).send("Page Not Found");
})

data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening in: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});
