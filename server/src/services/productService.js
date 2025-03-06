const Product = require('../schemas/ProductSchema');


async function addNewProduct(dto){
    try {
        if(!dto){
         throw new Error('Data not found!');
        }


        const product = new Product({
            name: dto.name,
            description: dto.description,
            price: dto.price,
            image: dto.image,
            category: dto.category,
            stock: dto.stock,
            featured: dto.featured,
            specs: dto.specs,
        });

        //save the product
        await product.save()

        return {"Add product": product};

    } catch (error) {
        throw error; // Propagate the error back to the controller
    }

}



async function getProductById(productId) {
    try {
        if (!productId) {
            throw new Error('Product ID is required!');
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found!');
        }

        const productDto = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock,
            featured: product.featured,
            specs: product.specs,
        }

        return productDto;

    } catch (error) {
        throw error;
    }
}


module.exports = {addNewProduct, getProductById, getAllProducts}
