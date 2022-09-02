const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
	// get all tags
	Tag.findAll({
		// set up relation with product table
		include: [
			{
				model: Product,
				attributes: ["product_name", "price", "stock"],
				through: ProductTag,
				as: "product",
			},
		],
	})
		.then((tagData) => res.json(tagData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find specific tags by a specified id
	Tag.findOne({
		include: [{
			model: Product,
			attributes: ["product_name", "price", "stock"],
			through: ProductTag,
			as: "product"
		}],

		// select only when id is equal to query id
		where: {
			id: req.params.id,
		},
	})
		.then((tagData) => {
			// checks whether id was present
			if (!tagData) {
				res.status(404).json({ message: "No tag with that id" });
				return;
			}
			res.json(tagData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	// create a new tag
	Tag.create({
		// looks for request values to create tag instance in database
		tag_name: req.body.tag_name,
	})
		.then((tagData) => res.json(tagData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(
		{
			// sets new tag name based on req body
			tag_name: req.body.tag_name,
		},
		// selects id from query
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((tagData) => {
			// check whether query id exists
			if (!tagData) {
				res.status(404).json({ message: "No tag with that id" });
				return;
			}
			res.json(tagData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
	Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((tagData) => {
			// check whether id value exists in database
			if (!tagData) {
				res.status(404).json({ message: "No tag with that id" });
				return;
			}
			res.json(tagData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
