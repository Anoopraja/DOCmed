import Product from "../model/product.model.js";



const getAllProduct = async (req, res) => {
    try {
        const medicines = await Product.find({});

        // console.log("Database:", Product.db.name);
        // console.log("Collection:", Product.collection.name);
        // console.log("Total medicines:", medicines.length);

        return res.status(200).json({
            success: true,
            message: "Medicines fetched successfully",
            count: medicines.length,
            data: medicines
        });

    } catch (error) {
        console.error("Get All Medicine Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const addProduct = async (req, res) => {
    try {
        const {
            id,
            name,
            price,
            isDiscontinued,
            manufacturerName,
            type,
            packSizeLabel,
            shortComposition1,
            shortComposition2,
        } = req.body;

        // Required fields validation
        if (
            !id ||
            !name ||
            price === undefined ||
            !manufacturerName
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Validate price
        const medicinePrice = Number(price);

        if (!Number.isFinite(medicinePrice) || medicinePrice < 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid medicine price",
            });
        }

        // Validate medicine type
        const allowedTypes = [
            "allopathy",
            "ayurvedic",
            "homeopathy",
            "other",
        ];

        if (type && !allowedTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid medicine type",
            });
        }

        // Check duplicate medicine ID
        const existingMedicine = await Product.findOne({ id });

        if (existingMedicine) {
            return res.status(409).json({
                success: false,
                message: "Medicine already exists",
            });
        }

        // Create medicine
        const medicine = await Product.create({
            id,
            name,
            price: medicinePrice,
            isDiscontinued: isDiscontinued ?? false,
            manufacturerName,
            type: type || "allopathy",
            packSizeLabel,
            shortComposition1,
            shortComposition2,
        });

        return res.status(201).json({
            success: true,
            message: "Medicine added successfully",
            data: medicine,
        });

    } catch (error) {
        console.error("Add Medicine Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};




export { getAllProduct, addProduct };