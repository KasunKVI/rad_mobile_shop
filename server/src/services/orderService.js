const Order = require('../schemas/OrderSchema');
const OrderDTO = require("../dtos/orderDTO");


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


async function updateOrderStatus(orderId, status) {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, {status: status}, {new: true});

        return updatedOrder;

    } catch (error) {
        return {error: error.message};
    }
}

async function getOrdersByUserId(userId) {
    try {
        let orders;
        if (userId) {
            orders = await Order.find({ userId }).populate("items.product");
        } else {
            orders = await Order.find().populate("items.product");
        }

        return orders.map(order => new OrderDTO(
            order._id,
            order.userId,
            order.items.map(item => ({
                product: item.product ? {
                    id: item.product._id,
                    name: item.product.name,
                    description: item.product.description,
                    price: item.product.price,
                    image: item.product.image,
                    category: item.product.category,
                    stock: item.product.stock,
                    featured: item.product.featured,
                    specs: item.product.specs
                } : null, // Ensuring product details are included
                quantity: item.quantity
            })),
            order.total,
            order.status,
            order.shippingAddress,
            order.createdAt,
            order.updatedAt
        ));
    } catch (error) {
        return { error: error.message };
    }
}



module.exports = {addNewOrder, updateOrderStatus, getOrdersByUserId}
