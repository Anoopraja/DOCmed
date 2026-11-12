import Product from "../model/product.model.js";

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            count: products.length,
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const addProduct = async (req, res) => {
    try {
        const {
            name,
            brand,
            genericName,
            description,
            category,
            composition,
            manufacturer,
            medicineType,
            productForm,
            packSize,
            mrp,
            sellingPrice,
            stock,
            requiresPrescription,
            expiryDate,
            image,
        } = req.body;

        // Required fields validation
        if (
            !name ||
            !category ||
            !composition ||
            !productForm ||
            mrp === undefined ||
            sellingPrice === undefined ||
            !expiryDate
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Validate prices
        if (Number(mrp) < 0 || Number(sellingPrice) < 0) {
            return res.status(400).json({
                success: false,
                message: "Price cannot be negative",
            });
        }

        if (Number(sellingPrice) > Number(mrp)) {
            return res.status(400).json({
                success: false,
                message: "Selling price cannot be greater than MRP",
            });
        }

        // Create product
        const product = await Product.create({
            name,
            brand,
            genericName,
            description,
            category,
            composition,
            manufacturer,
            medicineType,
            productForm,
            packSize,
            mrp,
            sellingPrice,
            stock,
            requiresPrescription,
            expiryDate,
            image: image || null,
            shopowner: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });

    } catch (error) {
        console.error("Add Product Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export { getAllProduct, addProduct };