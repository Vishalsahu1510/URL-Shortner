const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const {connectToMongoDB} = require("./connect");
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth");


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');


const app = express();
const PORT = process.env.PORT || 3000;


require('dotenv').config();


// mongodb://127.0.0.1:27017/short-url
connectToMongoDB(process.env.MONGO_URI)
.then(()=> console.log("Connected to MongoDB"))

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));   

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/',checkAuth, staticRoute);


app.listen(PORT, ()=>{
  console.log(`server started at PORT:${PORT}`);
})
