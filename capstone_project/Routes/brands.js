const express = require("express");
const { BrandModel, validateData } = require("../Models/brandModel");
const {CategoryModel} = require('../Models/categoryModel')
const router = express.Router();

router.get("/", async (req, res) => {
  let brands = await BrandModel.find();
  res.send(brands);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const category = await CategoryModel.findById(req.body.categoryId)
  if(!category) return res.status(400).send("Invalid category Id")

  const brand = new BrandModel({
    name: req.body.name,
    address: req.body.address,
    contact_number: req.body.contact_number,
    category:{
_id:category._id,
name:category.name

    }
  });

  await brand.save();
  res.send(brand);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await CategoryModel.findById(req.body.categoryId)
  if(!category) return res.status(400).send("Invalid category Id")

  const brandUpdate = await BrandModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      address: req.body.address,
      contact_number: req.body.contact_number,
      category:{
        _id:category._id,
        name:category.name
        
            }
    },
    { new: true }
  );

  if (!brandUpdate) return res.status(401).send("The brand With Id not found");

  res.send(brandUpdate);
});

router.delete("/:id", async (req, res) => {
  const brandToDelete = await BrandModel.findByIdAndDelete(req.params.id);
  if (!brandToDelete)
    return res.status(401).send("The brand With Id not found");
  res.send(brandToDelete);
});

router.get("/:id", async (req, res) => {
  const brand = await BrandModel.findById(req.params.id);
  if (!brand) return res.status(401).send("The brand With Id not found");
  res.send(brand);
});

module.exports = router;
