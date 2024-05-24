
const Cart = require('../model/cartModel');
const CartProduct = require('../model/cartProductModel');
const User = require('../model/userModel');
const Product = require('../model/productModel')

const addToCart = async (req, res) => {
  const { userId, products } = req.body;

  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    for (const { productId, quantity } of products) {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      if (product.quantity < quantity) {
       
        
        return res.status(400).json({ error: 'Insufficient product quantity' });
      }
      product.quantity -= quantity;
      await product.save();

      await CartProduct.upsert({ cartId: cart.id, productId, quantity });
    }

    res.status(200).json({ message: 'Products added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;
  console.log('UserId:', userId);
  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        through: {
          attributes: ['quantity'],
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    console.log('sdsdcaw')
    const totalSum = cart.Products.reduce((sum, product) => sum + product.price * product.CartProduct.quantity, 0);

    res.status(200).json({ cart, totalSum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  const { cartId, productIds } = req.body;

  try {
    await CartProduct.destroy({ where: { cartId, productId: productIds } });

    res.status(200).json({ message: 'Products removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCartProductQuantity = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    const cartProduct = await CartProduct.findOne({ where: { cartId, productId } });
    if (!cartProduct) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    const product = await Product.findByPk(productId);
    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient product quantity' });
    }
    
    cartProduct.quantity = quantity;
    await cartProduct.save();

    res.status(200).json({ message: 'Product quantity updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={addToCart,getCart,deleteFromCart,updateCartProductQuantity}