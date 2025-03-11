const Order = require('../schemas/OrderSchema');


async function addNewOrder(orderDTO) {
    try {
        const order = new Order({
            userId: orderDTO.userId,
            items: orderDTO.items.map(item => ({
                product: item.product, // Ensure this is a valid ObjectId
                quantity: item.quantity
            })),
            total: orderDTO.total,
            status: orderDTO.status || 'pending', // Default to 'pending' if not provided
            shippingAddress: orderDTO.shippingAddress,
            createdAt: orderDTO.createdAt,
        });

        const result = await order.save();
        return result;
    } catch (error) {
        return { error: error.message };
    }
}






module.exports = {addNewOrder, updateOrderStatus}
