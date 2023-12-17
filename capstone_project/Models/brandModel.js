const Joi = require("joi");
const {categorySchema} = require('../Models/categoryModel')
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
  category:{
type:categorySchema,
required:true
  },
  contact_number: 
  [
  {
    type: String,
    required: false,
    minLength: 10,
    maxLength: 10,
  }]
});

const BrandModel = mongoose.model("Brands", brandsSchema);


function validateData(brands) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
     address: Joi.string().min(3).required(),
     contact_number: Joi.string().min(10).max(10),
     categoryId: Joi.string().required()
  });

  return schema.validate(brands);
}

exports.BrandModel = BrandModel
exports.validateData = validateData