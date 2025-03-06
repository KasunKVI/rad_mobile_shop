const ProductDTO = require('../dtos/productDTO');
const {addNewProduct} = require("../services/productService")

async function addProduct(req, res) {

    const dto = new ProductDTO(
        "",
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.image,
        req.body.category,
        req.body.stock,
        req.body.featured,
        req.body.specs,
    )

    const result = await addNewProduct(dto);

    if (result.error){
        return res.status(400).send({"Status": "error"});

    }

    res.status(200).json(result);


}

module.exports = {addProduct};
