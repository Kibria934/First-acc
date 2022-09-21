const express = require("express");
const ProductsController = require("../../controllers/Product.controller");
const router = express.Router();

router.route("/bulkUpdate").patch(ProductsController.UpdateManyProducts);
router.route("/bulkDelete").delete(ProductsController.deleteManyProducts);

router
  .route("/")
  .get(ProductsController.getProduct)
  .post(ProductsController.postProduct);

router
  .route("/bulkUpdate-separate")
  .patch(ProductsController.UpdateManyProductsSeparate);

router
  .route("/:id")
  .patch(ProductsController.updateProduct)
  .delete(ProductsController.deleteProductById);

module.exports = router;
