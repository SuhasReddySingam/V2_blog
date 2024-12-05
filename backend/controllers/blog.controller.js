import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {HfInference} from '@huggingface/inference';
// const inference=new HfInference(import.meta.env.VITE_API_KEY);
export const getProducts = async (req, res) => {
	const { name } = req.params;
	try {
		const products = await Product.find({ authour: name });
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body; // user will send this data

	if (!product.title || !product.authour || !product.body) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
export const makeBlog = async (req,res) => {
	let currentTitle = "";
	for await (const output of inference.textGenerationStream({
		model: model,
		inputs: "Generate a title for a blog post which is relevant to the following "+newPrompt+".Generate only a single title",
		parameters: { max_new_tokens: 50, return_full_text: false }
	  })) {
		  if(output.generated_text!=null){
			  currentTitle += output.generated_text;
		  }
	  }
	let currentOutput="";
	for await (const output of inference.textGenerationStream({
	  model: model,
	  inputs: currentTitle+".This is the title for a blog post now generate a blog post which is suitable for this title,in a "+style+"writing style within "+limit+" words",
	  parameters: { max_new_tokens: 800, return_full_text: false }
	})) {
		res.status(500).json({success:true,message:output.generated_text})
	}
  };
