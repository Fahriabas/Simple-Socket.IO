const pool = require("./config");

const queryStudents = `
 CREATE TABLE IF NOT EXISTS "Students"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(120),
    "class" VARCHAR(120)
 )
`

pool.query(queryStudents, (err, res) => {
    if(err){
        console.log(err);
    } else {
        console.log('success create table Students');
    }
})

