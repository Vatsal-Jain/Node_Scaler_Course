const express = require("express");
const Middleware = require('./middlewares/middle')
const morgan = require('morgan')



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(Middleware.Middleware1)
app.use(Middleware.Middleware2)
app.use(morgan())

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
// get
app.get("/", (req, res) => {
  console.log("dhdch");
});

app.get("/about", (req, res) => {
  res.send("about us");
});

app.get("/contact", (req, res) => {
  res.send("contact");
});
//router paramater

let courses = [
  { id: 1, name: "Javascript" },
  {
    id: 2,
    name: "NodeJs",
  },
  {
    id: 3,
    name: "React Native",
  },
];



app.get("/courses", (req, res) => {
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {

    const ID = req.params.id
    console.log(ID)

    const result =courses.find((item) => item.id === parseInt(ID))
console.log(result)
    if(result){
        res.send(result.name)
    }
    else{
        res.status(404).send('Id not found')
    }});


    app.post('/courses',(req,res) =>{
        const course ={
id:courses.length + 1,
name:req.body.name
        }
        
       
        courses.push(course)
         res.send(courses)
    })


    app.put('/courses',(req,res) => {
        const {id,name} = req.body

        const course = courses.find((item) => item.id === parseInt(id))
       console.log(course)
       
         course.name = name
        res.send(courses)
    })


    //delete a course

    app.delete('/courses/:id',(req,res) => {
        // let remainingCourses = courses.filter((item) => item.id !== parseInt(req.params.id))
        // courses= remainingCourses
        // res.send(courses)

        //or 

const courseToDelete = courses.find((item) => item.id === parseInt(req.params.id))
const indexOfDeleteInCourses = courses.indexOf(courseToDelete)

courses.splice(indexOfDeleteInCourses,1)
res.send(courses)
    })
