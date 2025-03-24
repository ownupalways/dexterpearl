import imgItems from "./generalScript.js";

// Fetching data from items.json
export const getAdsList = async () => {
	const cardList = await imgItems()
	
	if (cardList === null) {
		console.log(`Failed to loads items`)

		return null
	}

	return  cardList
}
