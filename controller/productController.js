const Product = require('../model/productModel');

const addMultipleProducts = async (req, res) => {
  const products = req.body;

  try {
    const createdProducts = await Product.bulkCreate(products);
    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const searchProducts = async (req, res) => {
const {productName,description} = req.query;
console.log('adncabsd')
try{
 const products = await Product.findAll({
   where:{
    productName : productName,
    description : description
   }
  })
   res.status(200).json(products);
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};

module.exports = {addMultipleProducts,searchProducts}