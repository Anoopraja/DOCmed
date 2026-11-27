import Cart from "../model/cart.model.js";
import Medicine from "../model/product.model.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid product ID and quantity are required"
      });
    }

    const product = await Medicine.findById(productId);

    if (!product || product.isDiscontinued) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unavailable"
      });
    }

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const cartItem = userCart.items.find(
        (item) => item.product.toString() === productId
      );

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        userCart.items.push({ product: productId, quantity });
      }

      await userCart.save();
    }

    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: userCart.items,
    });

  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    const cartItem = userCart.items.id(req.params.itemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    cartItem.deleteOne();
    await userCart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    const userCart = await Cart.findOne({ user: req.user._id });
    const cartItem = userCart?.items.id(req.params.itemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await userCart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      data: cartItem,
    });
  } catch (error) {
    console.error("Update cart item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getCartItems = async (req, res) => {
  try {
    const userId = req.user?._id;

    // Authentication check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    const userCart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      model: Medicine,
    });
    const cartItems = userCart?.items ?? [];

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      count: cartItems.length,
      data: cartItems
    });

  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { addToCart, clearCart, getCartItems, removeFromCart, updateCartItem };