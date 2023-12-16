const express = require("express");
const Joi = require("joi");
const router = express.Router();

const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  address: {
    type: String,
    required: true,
  },
  contact_number: 
  [
  {
    type: String,
    required: false,
  }]
});

const BrandModel = new mongoose.model("Brands", brandsSchema);


function validateData(brands) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
     address:Joi.string().min(3).required(),
     contact_number:Joi.string().min(10).max(10)
  });

  return schema.validate(brands);
}

router.get("/", async (req, res) => {
  let brands = await BrandModel.find();
  res.send(brands);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const brand = new BrandModel({
    name: req.body.name,
    address:req.body.address,
    contact_number:req.body.contact_number
  });

  await brand.save();
  res.send(brand);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const brandUpdate = await BrandModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name,address:req.body.address,contact_number:req.body.contact_number },
    { new: true }
  );

  if (!brandUpdate)
    return res.status(401).send("The brand With Id not found");

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

module.exports = router