const mongoose = require('mongoose');
const Product = require('../routes/model/Product.model');
// const Category = require('../routes/model/Category');

const router = require("express").Router();

router.get('/', async (req, res) => {
  try {
      const users = await Product.find({});
      res.json(users);
  } catch (error) {
      res.status(400).send(error);
  }
}); // 


// add a product 
router.post('/add__product', async (req, res) => {
  try {
    // get user object from req body
    let productParam = req.body;
    // validate product object
    if(await Product.findOne({name:productParam.name})){
    	return res.status(400).send("product already exist");
    }
    const product = new Product(productParam);
    await product.save();
    
    return res.send("Product is Created");
  } catch (error) {
    return res.status(400).send(error.message);
  }
}); // done 

// get product by its id 
router.get("/products/:id", async (req, res) => {
  try {
    // req id
    const id = req.params.id;

    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}); // done 


//update data by id 
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await Product.findByIdAndUpdate(id,body, {new : true});
	return res.json(product)

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


router.get("/ByPrice/:price", async (req, res) => {
  try {
    const {price } = req.params;
    const filteredProducts = await Product.find({ price: price });
    if (!filteredProducts) {
      return res
        .status(404)
        .json({ message: `there are no products with the price : {price}` });
    }
    return res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});//done

// search with a string
router.get('/Search/', async (req, res) => {
  try {
    const searchString = req.query.q;

    // Use a regular expression to perform a case-insensitive search
    const regex = new RegExp(searchString, 'i');

    // Find products that match the search string
    const result = await Product.find({ name: regex });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get products in a specific category
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const filteredProducts = await Product.find({ category: category });
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // done

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(400).send(`cannot find product with id ${id}`);
      return;
    }

    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get products in a specific brand
router.get('/brand/:brand', async (req, res) => {
  const brand = req.params.brand;
  try {
    const filteredProducts = await Product.find({ brand: brand });
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // done


module.exports = router;
