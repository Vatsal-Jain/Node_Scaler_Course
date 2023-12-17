const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);

function validateData(category) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
  
    return schema.validate(category);
  }


exports.CategoryModel = CategoryModel
exports.validateData = validateData
exports.categorySchema = categorySchema