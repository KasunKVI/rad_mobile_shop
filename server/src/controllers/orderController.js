const OrderDTO = require('../dtos/orderDTO');
const {addNewOrder, updateOrderStatus} = require("../services/orderService")


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


module.exports = {addOrder, updateStatus}
