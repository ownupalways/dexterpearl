import imgItems from "./generalScript.js";

// Fetching data from items.json
const getAdsList = async () => {
	const cardList = await imgItems()
	

	if (cardList === null) {
		console.log(`Failed to loads items`)

		return
	}

	let badgeSingleImg = document.querySelector('.badgeSingleImg')

	badgeSingleImg.innerHTML = ` `
	if (Array.isArray(cardList[0])) {
		cardList[0].forEach(item => {
			let swiftItem = document.createElement('div')
			swiftItem.classList.add('boxSingleImg')
			swiftItem.dataset.id = item.id
			swiftItem.innerHTML = `
							<img src="${item.image}" alt="" loading="lazy">
							<div class="badgeSingleInfo">
								<h3 class="h3">${item.title}</h3>
								<p class="textY">
									${item.description} 
								</p>
								<a href="http://127.0.0.1:5500/images/2.jpg">Learn More</a>
							</div>
					`
			badgeSingleImg.appendChild(swiftItem)
		})
	} else {
		console.log("cardList is not an Array")
	}
	swiftAnimation()
	hoverEffect()
}

getAdsList()

// SWIFT ITEM CARD ANIMATION **********
let intervalId;
let isPaused = false;
const swiftAnimation = () => {
	let swiftCardIndex = 0;
	const showSwiftCard = () => {
		let boxSingleImg = document.querySelectorAll('.boxSingleImg')


		let countDownCard = boxSingleImg.length

		for (let v = 0; v < countDownCard; v++) {
			boxSingleImg[v].style.display = 'none';
		}

		swiftCardIndex++

		if (swiftCardIndex > countDownCard) {
			swiftCardIndex = 1
		}

		boxSingleImg[swiftCardIndex - 1].style.display = 'flex'
	}

	return showSwiftCard
}
const holdIt = swiftAnimation()

// HANDLING MOUSEOVER OPERATION******
const hoverEffect = () => {
	let boxSingleImg = document.querySelectorAll('.boxSingleImg');
	
	boxSingleImg.forEach(cardImg => {
		cardImg.addEventListener('mouseover',  () => {
        clearInterval(intervalId);
		isPaused = true;
		});
		
		cardImg.addEventListener('mouseleave', () => {
        isPaused = false;
        startInterval();
		});
	});
}


// SLIDER TIMER****
const startInterval = () => {
	intervalId = setInterval(holdIt, 1500)

}

startInterval()

// 
