
const Fav = require('../routes/model/Fav');

const router = require("express").Router();


router.get('/', async (req, res) => {
  try {
      const favs = await Fav.find({});
      res.json(favs);
  } catch (error) {
      res.status(400).send(error);
  }
}); // 




router.post("/" ,async (req, res) => {
  const fav = new Fav(req.body);

  try {
    const savedFav = await fav.save();
    res.status(200).json(savedFav);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedfav = await Fav.findByIdAndUpdate(id,body, {new : true});
    return res.status(200).json(updatedfav);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete("/:id",  async (req, res) => {
  try {
    await Fav.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/userfav/:userId", async (req, res) => {
  try {
    const favs = await Fav.find({ userId: req.params.userId });
    res.status(200).json(favs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
