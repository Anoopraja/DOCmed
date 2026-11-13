import cart from "../model/cart.model.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required"
      });
    }

    const cartItem = await cart.create({
      user: req.user._id,
      product: productId,
      quantity
    });

    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cartItem
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await cart.findByIdAndDelete(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

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

const getCartItems = async (req, res) => {
  try {
    const cartItems = await cart.find({ user: req.user._id }).populate("product");

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      count: cartItems.length,
      data: cartItems
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { addToCart, removeFromCart, getCartItems };