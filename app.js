const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

const usermodel = require("./models/user")


app.get('/',(req,res) => {
    res.render("index")
})

app.get('/read',async (req,res) => {
    let users = await usermodel.find();
    res.render("read",{users})
})

app.post('/create', async(req,res) => {
    let{name,email,password,imgurl} = req.body;

    let createduser = await usermodel.create({
        name,
        password,
        email,
        imgurl
    })

    res.redirect("/read");
})

app.get('/delete/:id',async (req,res) => {
    let users = await usermodel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read")
})

app.listen(3000);