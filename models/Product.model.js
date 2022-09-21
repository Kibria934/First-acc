const mongoose = require("mongoose");
//  Schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be greater than 3 character"],
      maxLength: [100, "Name is too long"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "psc"],
        message: "Unite value can't be {VALUE} must be litre/psc/kg",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isValid = Number.isInteger(value);
          if (isValid) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be integer",
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {VALUE}",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // category: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  { timestamps: true }
);

// middleware for pre save and post save: pre/post

/* productSchema.pre("save", function (next) {
  if (this.quantity <= 0) {
    this.status = "out-of-stock";
  }
  next();
});
 */
// productSchema.post("save", function (doc, next) {
//   console.log("after saving data is here");
//   next();
// });

// Mongoose model for products.
const Product = mongoose.model("product", productSchema);

module.exports = Product;
