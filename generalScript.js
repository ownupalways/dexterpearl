const imgItems = async () => {
    try {
        const response = await fetch("items.json")
        if (!response.ok) {
            throw new Error (
                `HTTP error! status: ${response.status}`
            )
        }
        const data = await response.json();
        const cardList = data

        console.log(cardList)
        return cardList 
    } catch (error) {
        console.error("Error fetching items:", error)

        return null
    }
}

export default imgItems
