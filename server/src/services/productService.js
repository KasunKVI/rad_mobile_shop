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

module.exports = {addNewProduct}
