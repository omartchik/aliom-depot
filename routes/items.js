const express = require("express");
const router = express.Router();
const Item = require("../models/item");
// ----------------------------------------- PAGE D'ACCUEIL
router.get('/', (req, res)=>{
    res.render('home')
})
// ----------------------------------------- PAGE D'ACCUEIL
// Route pour afficher tous les items (READ)
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.render("index", { items: items });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route pour afficher le formulaire de création (CREATE)
router.get("/new", (req, res) => {
  res.render("create");
});

// Route pour ajouter un nouvel item (CREATE)
router.post("/items", async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
  });

  try {
    await newItem.save();
    res.redirect("/items");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route pour éditer un item (UPDATE)
router.get("/items/:id/edit", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.render("edit", { item: item });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route pour mettre à jour un item (UPDATE)
router.post("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    item.name = req.body.name;
    item.quantity = req.body.quantity;
    await item.save();
    res.redirect("/items");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route pour supprimer un item (DELETE)
router.post("/:id/delete", async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);
    res.redirect("/items");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
