const express = require('express')
const app = express()
const port = 3000
const pool = require("./config")
const Student = require('./models/class')
const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)




app.set("view engine", "ejs")
app.set("views", "views")
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    pool.query(`SELECT * FROM "Students"`, (err, data) => {
        if(err){
            console.log(err);
            res.send(err)
        } else {
            let students = data.rows
            let instanceStudent = students.map(student => {
                return new Student(student.id, student.name, student.class)
            })
            res.render("index", { instanceStudent })
        }
    })
})

app.get("/chat", (req, res) => {
    res.render("chat")
})


app.post("/add", (req, res) => {
    const {name, classroom}  = req.body
    const query = `INSERT INTO "Students" ("name", "class")
                   VALUES($1, $2)
    `
    pool.query(query, [name, classroom], (err) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/")
        }

    })

})

io.on("connection", (socket) => {
    socket.on("message", (data) =>{
        const { id, message } = data
        socket.broadcast.emit("message", id, message)
    })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})