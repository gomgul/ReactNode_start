var express = require('express');
var app = express();
var PORT = 5000;
const bodyParser = require('body-parser');
const { User } = require("./models/User");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const mongoose = require('mongoose');
mongoose
  .connect('mongodb+srv://root:1234@cluster0.bd69w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });




// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/register', ( req, res ) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if(err) return res.json({ success : false, err })
        return res.status(200).json({
            success: true
        })
    })
});


app.listen(PORT, ()=> console.log(`server is listening ${PORT}`));