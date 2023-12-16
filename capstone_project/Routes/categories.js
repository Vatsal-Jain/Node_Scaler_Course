const express = require("express");
const Joi = require("joi");
const router = express.Router();

const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
});

const CategoryModel = new mongoose.model("Category", categorySchema);

const categories = [
  {
    id: 1,
    name: "Medicine",
  },
  {
    id: 2,
    name: "Surgical",
  },
  {
    id: 3,
    name: "Skincare",
  },
  {
    id: 4,
    name: "Nutrucales",
  },
];

function validateData(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(category);
}

router.get("/", async (req, res) => {
  let categories = await CategoryModel.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new CategoryModel({
    name: req.body.name,
  });

  await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const categoryUpdate = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!categoryUpdate)
    return res.status(401).send("The Category With Id not found");

  res.send(categoryUpdate);
});

router.delete("/:id", async (req, res) => {
  const categoryToDelete = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!categoryToDelete)
    return res.status(401).send("The Category With Id not found");
  res.send(categoryToDelete);
});


router.get("/:id", async (req, res) => {
    const category = await CategoryModel.findById(req.params.id);
    if (!category)
      return res.status(401).send("The Category With Id not found");
    res.send(category);
  });

// router.get('/',(req,res) => {
//     res.send(categories)
// })

// router.post('/',(req,res) => {
//    const {error} =  validateData(req.body)
//    if(error) return res.status(400).send(error.details[0].message)
//     const category ={
//          id:categories.length + 1,
//          name:req.body.name
//     }
//     categories.push(category)
//     res.send(category)
// })

// router.put('//:id',(req,res) => {

//     const categoryUpdate = categories.find(item => item.id === parseInt(req.params.id))

//     if(!categoryUpdate) return res.status(401).send("The Category With Id not found")
//     if(error) return res.status(200).send(error.details[0].message)

//     categoryUpdate.name = req.body.name
//     res.send(categoryUpdate)
// }
// )

// router.delete('//:id',(req,res) => {

//     const categoryToDelete = categories.find((item) => item.id === parseInt(req.params.id))
//     if(!categoryToDelete) return res.status(401).send("The Category With Id not found")
// const indexOfDeleteInCategory = categories.indexOf(categoryToDelete)

// categories.splice(indexOfDeleteInCategory,1)
// res.send(categories)
// }
// )

// router.get('//:id',(req,res) => {
//     const category = categories.find(item => item.id === parseInt(req.params.id))
//     if(!category) return res.status(401).send("The Category With Id not found")
//     res.send(category)
// })

module.exports = router;
