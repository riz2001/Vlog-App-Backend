const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { blogmodel } = require("./models/blog")
const bcrypt = require("bcryptjs")


const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://rizwan2001:rizwan2001@cluster0.6ucejfl.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")


const generatehashpassword =async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)

}



app.post("/signup",async(req, res) => {
    let input=req.body
    let hashpassword=await generatehashpassword(input.password)
    input.password=hashpassword
    let blog=new blogmodel(input)
    console.log(blog)
    blog.save()

    res.json({ status: "success" })
})

app.listen("8001", () => {
    console.log("server stated")

})