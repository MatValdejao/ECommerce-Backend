const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// find all categories
	Category.findAll({
		// create relation between product and category
		include: [
			{
				model: Product,
			},
		],
	})
		.then((categoryData) => res.json(categoryData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	Category.findOne({
		include: [
			{
				model: Product,
			},
		],
		// select at specific id
		where: {
			id: req.params.id,
		},
	})
		.then((categoryData) => {
			// check whether id exists
			if (!categoryData) {
				res.status(404).json({ message: "No category with that id" });
				return;
			}
			res.json(categoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	// create a new category
	Category.create({
		// what to post
		category_name: req.body.category_name,
	})
		.then((categoryData) => res.json(categoryData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update(
		{
			// what to update
			category_name: req.body.category_name,
		},
		{
			// update at specific id
			where: {
				id: req.params.id,
			},
		}
	)
		.then((categoryData) => {
			// check whether category id exists
			if (!categoryData) {
				res.status(404).json({ message: "No category with that id" });
				return;
			}
			res.json(categoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		// which id to destroy
		where: {
			id: req.params.id,
		},
	})
		.then((categoryData) => {
			// check whether id exists in database
			if (!categoryData) {
				res.status(404).json({ message: "No category with that id" });
				return;
			}
			res.json(categoryData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
