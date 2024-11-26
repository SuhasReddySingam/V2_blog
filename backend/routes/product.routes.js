import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/blog.controller.js";
const router = express.Router();

router.get("/view/:name", getProducts);
router.post("/create", createProduct);
router.post("/create-norm", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;