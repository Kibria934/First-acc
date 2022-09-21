const {
  getProduct,
  postProduct,
  updateProductService,
  updateManyProductsServices,
  UpdateManyProductsSeparateService,
  deleteProductByIdService,
  deleteManyProductsService,
} = require("../services/products.services");

module.exports.getProduct = async (req, res, next) => {
  console.log("at firest", req.query);
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    let queries = {};

    const filteredString = JSON.stringify(filters);
    const replaced = filteredString.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    console.log(replaced);

    filters = JSON.parse(replaced);
    excludeFields.forEach((field) => delete filters[field]);

    if (req.query.sort) {
      const sortedBy = req.query.sort.split(",").join(" ");
      queries.sort = sortedBy;
    }
    if (req.query.field) {
      const queryField = req.query.field.split(",").join(" ");
      queries.field = queryField;
    }
    if (req.query.page | req.query.limit) {
      const { page = 1, limit = 10 } = req.query;
      console.log("before", limit);

      const skip = (page - 1) * parseInt(limit);

      queries.skip = skip;
      queries.limit = +limit;
    }

    const result = await getProduct(filters, queries);

    if (result) {
      res.status(200).json({
        status: "success",
        message: "Successfully get data",
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "Fails",
      message: "Can't get data",
      error: error.message,
    });
  }
};

module.exports.postProduct = async (req, res) => {
  try {
    /* 
    const product = new Product(req.body)
    if (product.quantity <= 0) {
      product.status = "out-of-stock";
    }
    const result = await product.save(req.body); 
    */
    const result = await postProduct(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully saved data",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(req.body, id);
    // console.log(req.body);
    // res.end();
    if (result) {
      res.send({
        status: "Success",
        message: "Successfully updated data",
        data: result,
      });
    } else {
      res.send("something went wrong");
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      message: "Couldn't update products",
      error: error.message,
    });
    console.log(error);
  }
};

exports.UpdateManyProducts = async (req, res, next) => {
  try {
    const result = await updateManyProductsServices(req.body);
    if (result) {
      res.send({
        status: "Success",
        message: "Successfully updated data",
        data: result,
      });
    } else {
      res.send("something went wrong");
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      message: "Couldn't update products",
      error: error.message,
    });
    console.log(error);
  }
};

exports.UpdateManyProductsSeparate = async (req, res, next) => {
  try {
    const result = await UpdateManyProductsSeparateService(req.body);

    if (result) {
      res.send({
        status: "Success",
        message: "Successfully updated data",
        data: result,
      });
    } else {
      res.send("something went wrong");
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      message: "Couldn't update products",
      error: error.message,
    });
    console.log(error);
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

    if (result) {
      res.send({
        status: "Success",
        message: "Successfully deleted data",
      });
    } else {
      res.send("something went wrong");
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      message: "Couldn't delete product",
      error: error.message,
    });
    console.log(error);
  }
};

exports.deleteManyProducts = async (req, res, next) => {
  try {
    const result = await deleteManyProductsService(req.body);
    if (result) {
      res.send({
        status: "Success",
        message: "Successfully deleted data",
        data: result,
      });
    } else {
      res.send("something went wrong");
    }
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      message: "Couldn't delete products",
      error: error.message,
    });
    console.log(error);
  }
};
