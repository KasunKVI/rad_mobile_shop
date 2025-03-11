const OrderDTO = require('../dtos/orderDTO');
const {addNewOrder, updateOrderStatus, getOrdersByUserId} = require("../services/orderService")


async function addOrder(req, res) {

    const dto = new OrderDTO(
        "",
        req.base.userId,
        req.body.items,
        req.body.total,
        req.body.status,
        req.body.shippingAddress,
        req.body.createdAt,
        new Date(),
    )

    const result = await addNewOrder(dto);

    if (result.error){
        return res.status(400).send({"Status": "error"});

    }

    res.status(200).json(result);
}

async function updateStatus(req, res) {
    const orderId = req.params.id;
    const status = req.body.status;

    const updatedOrder = await updateOrderStatus(orderId, status);

    if (updatedOrder.error){
        return res.status(400).send({"Status": "error"});
    }

    res.status(200).json(updatedOrder);
}

async function getOrders(req, res) {
    try {
        const userId = req.query.userId || null; // Get userId from query params
        const orders = await getOrdersByUserId(userId);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}


module.exports = {addOrder, updateStatus, getOrders}
