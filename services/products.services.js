const Product = require("../models/Product.model");

module.exports.getProduct = async (filters, queries) => {
  console.log(filters);
  console.log("sercices colsol", queries.field);
  const result = await Product.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.field)
    .sort(queries.sort);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { pageCount, totalProducts, data: result };
};

module.exports.postProduct = async (doc) => {
  const result = await Product.create(doc);
  return result;
};

exports.updateProductService = async (data, id) => {
  const result = await Product.updateOne(
    { _id: id },
    { $set: data },
    {
      runValidators: true,
    }
  );

  return result;
};

exports.updateManyProductsServices = async (data) => {
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });

  return result;
};

exports.UpdateManyProductsSeparateService = async (data) => {
  console.log("this is", data.ids);
  let products = [];
  data.ids.forEach((product) => {
    products.push(
      Product.updateOne({ _id: product.id }, product.data, {
        runValidators: true,
      })
    );
  });

  console.log("products is : ", products);
  const result = await Promise.all(products);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.deleteManyProductsService = async (data) => {
  console.log(data);
  const result = await Product.deleteMany({ _id: data.ids });
  return result;
};
