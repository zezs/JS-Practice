const express = require('express');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));  
app.use(session({secret: 'notagoodsecret'}))

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/loginDemo' );
  console.log("Connection open!!!");
}

const requireLogin = (req, res, next) => {
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    next();
}

app.get('/secret', requireLogin, (req, res)=>{
    res.render('secret.ejs')
})

app.get('/topsecret', requireLogin, (req, res)=>{
    res.send("TOP SECRET!!!")
})

app.get('/', (req, res)=>{
    res.send("This is home page!");
})

app.get('/register', (req, res)=>{
    res.render('register.ejs');
})

//signup
app.post('/register', async(req, res)=>{
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id; 
    res.redirect('/');
})

//login
app.get('/login', (req, res)=>{
    res.render('login.ejs')
})
app.post('/login', async(req, res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username});
    const validPassword = await bcrypt.compare(password, user.password)
    if(validPassword){
        req.session.user_id = user._id;  //string user id in session
        res.redirect('/secret')
    }
    else{
        res.redirect('/login')
    }
})

//logout
app.post('/logout', (req, res)=>{
    // req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
})

app.listen(3000, ()=>{
    console.log("listening app pwd!")
})