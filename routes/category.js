const mongoose = require('mongoose');
const Product = require('../routes/model/Product.model');
const Category = require('../routes/model/Category');

const router = require("express").Router();

router.get('/', async (req, res) => {
  try {
      const category = await Category.find({});
      res.json(category);
  } catch (error) {
      res.status(400).send(error);
  }
}); // 


router.post('/add', async (req, res) => {
  try {
    let categoryParam = req.body;
    if(await Category.findOne({name:categoryParam.name})){
    	return res.status(400).send("category already exist");
    }
    const category = new Category(categoryParam);
    await category.save();
    
    return res.send("category is Created");
  } catch (error) {
    return res.status(400).send(error.message);
  }
}); // done 

// get product by its id 
router.get("/:id", async (req, res) => {
  try {
    // req id
    const id = req.params.id;

    const category = await Category.findById(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}); // done 


//update data by id 
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await Category.findByIdAndUpdate(id,body, {new : true});
	return res.json(category)

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// Get products in a specific category
router.get('/products/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const filteredProducts = await Product.find({ category: category });
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // done

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(400).send(`cannot find category with id ${id}`);
      return;
    }

    res.send(category);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;
