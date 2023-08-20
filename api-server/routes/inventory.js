const express = require("express");
// const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const inventoryRouter = express.Router()
inventoryRouter.use(bodyParser.json());


// const inventoryUrlPath = path.join(__dirname, "./stores/inventory.json");



// 1. Create An Item

inventoryRouter.post("/", (req, res) => {
    const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
    const inventoryItems = JSON.parse(inventoryPathRead);

    const itemsToCreate = req.body;

    const lastItemId = inventoryItems[inventoryItems.length - 1].id;
    const newItemId = lastItemId + 1;

    // const inventoryCreateId = { ...itemsToCreate, id: newItemId }
    
    inventoryItems.push({ ...itemsToCreate, id: newItemId });

    fs.writeFile(
			"./stores/inventory.json",
			JSON.stringify(inventoryItems),
			(error) => {
				if (error) {
					res.status(500);
				}
				res.status(200).json(itemsToCreate)
			}
		);
})


// 2. Get All Items

inventoryRouter.get("/", (req, res) => {
	const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
	res.status(200).send(inventoryPathRead)
})



// 3. Get One Item

inventoryRouter.get("/:id", (req, res) => {
	const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
	const inventoryItems = JSON.parse(inventoryPathRead);

	const inventoryId = req.params.id
	const itemToFind = inventoryItems.find((item) => {
		return item.id == parseInt(inventoryId)
	})

	if (!itemToFind) {
		res.status(404).send("Inventory Item Not Found")
	}
	res.status(200).json(itemToFind)
})


// 4. Update An Item

inventoryRouter.put("/:id", (req, res) => {
	const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
	const inventoryItems = JSON.parse(inventoryPathRead);

	const updateInventory = req.body

	const inventoryId = req.params.id;
	const itemToFind = inventoryItems.findIndex(item => item.id === parseInt(inventoryId))

	if (itemToFind == -1) {
		res.end("Inventory ID Not Found")
	}

	inventoryItems[itemToFind] = { ...inventoryItems[itemToFind], ...updateInventory }
	
	fs.writeFile("./stores/inventory.json", JSON.stringify(inventoryItems), (error) => {
		if (error) {
			res.status(500)
			res.end("Inventory update not successful")
		}
		res.json(inventoryItems[itemToFind])
	});
})


// 5. Delete An item

inventoryRouter.delete("/:id", (req, res) => {
	const inventoryPathRead = fs.readFileSync("./stores/inventory.json");
	const inventoryItems = JSON.parse(inventoryPathRead);

	const inventoryId = req.params.id;
	const itemToFind = inventoryItems.findIndex(
		(item) => item.id === parseInt(inventoryId)
	);

	if (itemToFind == -1) {
		res.status(500).send('Inventory Item Not Found')
		return
	} else {
		inventoryItems.splice(itemToFind, 1)
	}

	fs.writeFile(
		"./stores/inventory.json",
		JSON.stringify(inventoryItems),
		(error) => {
			if (error) {
				res.status(500);
				res.send("Internal Server Error");
			}
			res.status(200).send("Inventory Item successfully deleted");
		}
	);
})

module.exports = inventoryRouter