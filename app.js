const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app=express();

app.set('view engine','ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));


app.use((req,res,next)=>{
    User.findById('653c3486521deea19c75c7bc').then(user=>{
        console.log('user: ',user);
        req.user= new User(user.name,user.email,user.cart,user._id);
        next();
    }).then(()=>{
        console.log("app: ",req.user);
    })
    .catch(err=>console.log(err));
})

//admin routes
app.use('/admin',adminRoutes);
// //shop routes
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3000);
});