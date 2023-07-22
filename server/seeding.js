const fs = require("fs")
const pool = require("./config")


const data = JSON.parse(fs.readFileSync("./data/students.json", "utf-8")).map(el => {
    return `('${el.name}','${el.class}')`
})


const queryStudents = `
    INSERT INTO "Students" ("name", "class")
    VALUES ${data}
`


pool.query(queryStudents, (err, res) => {
    if(err){
        console.log(err);
    } else {
        console.log("success seeding to table users");
    }
})