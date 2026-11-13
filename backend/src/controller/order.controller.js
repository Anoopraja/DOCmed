import Order from "../model/order.model.js";

const bookOrder = async (req, res) => {
  try {
    const {
      productid,
      quantity,
      address,
      paymentMethod
    } = req.body;

    if (!productid || !quantity || !address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const order = await Order.create({
      user: req.user._id,
      product: productid,
      quantity,
      address,
      paymentMethod
    });

    return res.status(201).json({
      success: true,
      message: "Order booked successfully",
      data: order
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const orderCancel = async (req, res) => {
    try{
        const { orderId } = req.params; 
        const order = await Order.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const orderAccept = async (req,res) => {
    try{
        const { orderId } = req.params;
    const orderAccepted = await Order.findByIdAndUpdate(orderId,{ status: "accepted" }, { new: true });
    if(!orderAccepted){
        return res.status(404).json({
            success: false,
            message: "something went wrong"
        })
    }
    return res.status(201).json({
        success:true,
        message:"Order accepted successfully"
    })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { bookOrder, orderCancel, orderAccept };