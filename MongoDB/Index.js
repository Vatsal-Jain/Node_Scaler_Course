const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/testDatabase")
  .then(() => {
    console.log("connection established successfully");
  })
  .catch((error) => {
    console.log("coudnlt no connect ti mongodb", error);
  });

//schema

const BatchSchema = new mongoose.Schema({
  expiry: {
    type: Date,
    required: true,
  },
  batch_number: {
    type: String,
    required: true,
  },
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  category: {
    type: String,
    required: true,
    enum: ["Medicine", "Sugrical", "Skincare"],
  },
  manufacturer: {
    type: String,
    required: true,
  },
  composition: {
    type: String,
    required: true,
  },
  requireRx: {
    type: Boolean,
    required: true,
  },
  prescriptionImage: {
    type: String,
    required: function () {
      return this.requireRx;
    },
  },
  price: {
    type: Number,
    required: true,
  },
  stock_quantity: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: String,
      comment: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  tags: {
    type: Array,
    validate:{
    validator: function (tags) {
      return tags.length > 1;
    }}
  },

  images: [
    {
      type: String,
    },
  ],
  batches: [
    {
      expiry: {
        type: Date,
        required: true,
      },
      batch_number: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
async function createProduct() {
  const product = new Product({
    name: "Losar H",
    category: "Skincare",
    tags:['Medicine','Slin'],
    manufacturer: "Torrent Pharma",
    composition: "Losartan 50mg",
    price: 200,
    requireRx: false,
    // prescriptionImage: "shabsahs",
    stock_quantity: 100,
    reviews: [
      {
        user: "User123",
        comment: "Effective medication!",
        rating: 5,
      },
      {
        user: "User456",
        comment: "Not as expected.",
        rating: 2,
      },
      {
        user: "User3216",
        comment: "Best.",
        rating: 4,
      },
    ],
    batches: [
      {
        expiry: new Date("2023-12-31"), // Replace with the actual expiry date
        batch_number: "ABC123",
      },
      {
        expiry: new Date("2023-11-30"), // Replace with the actual expiry date
        batch_number: "XYZ456",
      },
    ],
  });
  try {
    // const result = await product.save();
    // console.log(result);
    await product.validate();
  } catch (error) {
    console.log("error is", error);
  }
}

async function createProduct2() {
  const product2 = new Product({
    name: "Olasr 20",
    tags:['Medicine','Slin'],
    manufacturer: "Torrent Pharma",
    category: "Skincare",
    composition: "Olsartan 20mg",
    price: 120,
    requireRx: true,
    prescriptionImage: "shabsahs",
    stock_quantity: 60,
    reviews: [
      {
        user: "Use1223",
        comment: "Good!",
        rating: 5,
      },
      {
        user: "User4516",
        comment: "Not as expected. with",
        rating: 1,
      },
      {
        user: "User41",
        comment: "Best and Good",
        rating: 4,
      },
    ],
    batches: [
      {
        expiry: new Date("2023-12-24"), // Replace with the actual expiry date
        batch_number: "OLSC123",
      },
      {
        expiry: new Date("2023-11-24"), // Replace with the actual expiry date
        batch_number: "ACAZ456",
      },
    ],
  });

  try {
    await product2.validate();
    //const result2 = await product2.save()
    //console.log(result2)
  } catch (error) {
    for(field in error.errors){
console.log(error.errors[field])
    }
  }
}

  createProduct()
//createProduct2();

async function getProducts() {
  const getProducts = await Product.find({ manufacturer: "Torrent Pharma" })
    .select({ name: 1, price: 1, manufacturer: 1, images: 1 })
    .sort({ name: 1 });
  console.log("product is", getProducts);
}

// getProducts()

async function getProductsByPrice() {
  try {
    const products = await Product.find({
      price: { $in: [200, 120] },
    })
      .select({ name: 1, manufacturer: 1, price: 1 })
      .or([{ manufacturer: "Torrent Pharma" }, { price: 220 }]);

    console.log("products with filter", products);
  } catch (error) {
    console.log("error funding products less than 150", error);
  }
}

// getProductsByPrice()

async function updateProduct(id) {
  try {
    let findProduct = await Product.findById(id);
    if (!findProduct) return;

    findProduct.name = "Olsar 20mg";
    const updateProduct = await findProduct.save();
    console.log("udpated product is", updateProduct);
  } catch (error) {
    console.log("error while updating product", error);
  }
}
// updateProduct('6572b6c9f5467999aee6ba86')

//Deleting a document

async function deleteProduct(id) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log(`Product with ID ${id} not found. Nothing to delete.`);
    } else {
      console.log("Deleted product:", deletedProduct);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

//deleteProduct('6572b6c9f5467999aee6ba86')
