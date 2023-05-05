const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/singup.html");
})

app.post("/",function(req,res){
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var email = req.body.email;
    console.log(fname, lname, email);

    const data = {
        members : [
            {
            email_address : email,
            status : "subscribed",
            merge_fields : {
                FNAME : fname,
                LNAME : lname
            }
            }

        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4b223eda35";

    const options = {
        method : "POST",
        auth : "Bhavana:57f3bf732dbefe78876c461c73da01a-us21"
    }

   const request= https.request(url,options,function(response){
          
          if(response.statusCode==200)
          {
                res.sendFile(__dirname+"/success.html");
          }
          else
          {
            res.sendFile(__dirname+"/failure.html");
          }
         response.on("data",function(data){
           console.log(JSON.parse(data));
         })
    })
    request.write(jsonData);
     request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Sever started on 3000 port");
})









//957f3bf732dbefe78876c461c73da01a-us21 appid
// 4b223eda35 list id