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


module.exports = {addOrder, updateStatus}
