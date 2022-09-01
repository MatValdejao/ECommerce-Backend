const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
	// get all tags
	Tag.findAll({})
		.then((tagData) => res.json(tagData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find specific tags by a specified id
	Tag.findOne({
		// select onlt when id is equal to query id
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
});

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
});

module.exports = router;
