// import imgItems from "./generalScript.js";

// // Fetching data from items.json
// const getAdsList = async () => {
// 	const cardList = await imgItems()
	

// 	if (cardList === null) {
// 		console.log(`Failed to loads items`)

// 		return
// 	}

// 	let badgeSingleImg = document.querySelector('.badgeSingleImg')

// 	badgeSingleImg.innerHTML = ` `
// 	if (Array.isArray(cardList[0])) {
// 		cardList[0].forEach(item => {
// 			let swiftItem = document.createElement('div')
// 			swiftItem.classList.add('boxSingleImg')
// 			swiftItem.dataset.id = item.id
// 			swiftItem.innerHTML = `
// 							<img src="${item.image}" alt="" loading="lazy">
// 							<div class="badgeSingleInfo">
// 								<h3 class="h3">${item.title}</h3>
// 								<p class="textY">
// 									${item.description}
// 								</p>
// 								<a href="http://127.0.0.1:5500/images/2.jpg">Learn More</a>
// 							</div>
// 					`
// 			badgeSingleImg.appendChild(swiftItem)
// 		})
// 	} else {
// 		console.log("cardList is not an Array")
// 	}
// 	smallCardAnimation()
// 	smallHoverEffect()
// }

// getAdsList()

// // SWIFT ITEM CARD ANIMATION **********
// let intervalId;
// let isPaused = false;
// const smallCardAnimation = () => {
// 	let smallCardIndex = 0;
// 	const showSmallCard = () => {
// 		let boxSingleImg = document.querySelectorAll('.boxSingleImg')


// 		let countDownCard = boxSingleImg.length

// 		for (let v = 0; v < countDownCard; v++) {
// 			boxSingleImg[v].style.display = 'none';
// 		}

// 		smallCardIndex++

// 		if (smallCardIndex > countDownCard) {
// 			smallCardIndex = 1
// 		}

// 		boxSingleImg[smallCardIndex - 1].style.display = 'flex'
// 	}

// 	return showSmallCard
// }
// const holdIt = smallCardAnimation()

// // HANDLING MOUSEOVER OPERATION******
// const smallHoverEffect = () => {
// 	let boxSingleImg = document.querySelectorAll('.boxSingleImg');
	
// 	boxSingleImg.forEach(cardImg => {
// 		cardImg.addEventListener('mouseover',  () => {
//         clearInterval(intervalId);
// 		isPaused = true;
// 		});
		
// 		cardImg.addEventListener('mouseleave', () => {
//         isPaused = false;
//         startInterval();
// 		});
// 	});
// }


// // SLIDER TIMER****
// const startInterval = () => {
// 	intervalId = setInterval(holdIt, 1500)

// }

// startInterval()

// //


import imgItems from "./generalScript.js";

// Fetching data from items.json
const getAdsList = async () => {
	const cardList = await imgItems()
	
	if (cardList === null) {
		console.log(`Failed to loads items`)

		return null
	}

	return  cardList
}



getAdsList().then(result => {
	if (result !== null) {
		console.log(result)
	}

	// Big Card Slider for lingerie.html
	const topBoardItemsDisplay = () => {
		console.log(result[2])
		let badgeInfo = document.querySelector('.badgeInfo') 
		
		badgeInfo.innerHTML = ''

		if (Array.isArray(result[2])) {
			result[2].forEach(currentItem => {
				let newCard = document.createElement('div')
				newCard.classList.add('infoHolder')
				newCard.dataset.id = currentItem.id
				newCard.innerHTML = `
						<div class="lingerImg">
							<img src="${currentItem.image}" alt="" loading="lazy">
				   		</div>
						<div class="lingerText">
							<h3>${currentItem.title}</h3>
							<p class="inText">
								${currentItem.productInfo}
							</p>
							<div class="actionBtns">
								<i class="fas fa-heart"></i>
								<i class="fas fa-share-alt"></i>
								<button class="needThis">I need This</button>
							</div>
						</div>
				`
				badgeInfo.appendChild(newCard)
			})
		} else {
			console.log("result is not an Array!")
		}

		BigCardAnimation()
		BigHoverEffect()
	}

	topBoardItemsDisplay()

	// Small Slider Display for lingerie.html
	const smallSliderCard = () => {
		let badgeSingleImg = document.querySelector('.badgeSingleImg')

		badgeSingleImg.innerHTML = ` `
		if (Array.isArray(result[0])) {
			result[0].forEach(item => {
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
		smallCardAnimation()
		smallHoverEffect()
	}
	smallSliderCard()
})

// Big Card Animation********
let BigCardIntervalId
const BigCardAnimation = () => {
	let BigCardIndex = 0
	const BigCardsCount = () => {
		let infoHolder = document.querySelectorAll('.infoHolder')

		let countBigCard = infoHolder.length

		for (let B = 0; B < countBigCard; B++) {
			infoHolder[B].style.display = 'none';
		}

		BigCardIndex++

		if (BigCardIndex > countBigCard) {
			BigCardIndex = 1
		}

		infoHolder[BigCardIndex - 1].style.display = 'flex'
	}

	return BigCardsCount
}

const BigHoldIt = BigCardAnimation()

const BigCardTimerInterval = () => {
	BigCardIntervalId = setInterval(BigHoldIt, 1000)
}
BigCardTimerInterval()

const BigHoverEffect = () => {
	let infoHolder = document.querySelectorAll('.infoHolder')
	console.log(infoHolder)

	infoHolder.forEach(BigCardImg => {
		BigCardImg.addEventListener('mouseover', () => {
			clearInterval(BigCardIntervalId)
			isPaused = true;
		})

		BigCardImg.addEventListener('mouseleave', () => {
			isPaused = false;
			BigCardTimerInterval()
		})
	})
}

// Small Cards ANIMATION **********
let smallCardIntervalId;
let isPaused = false;
const smallCardAnimation = () => {
	let smallCardIndex = 0;
	const showSmallCard = () => {
		let boxSingleImg = document.querySelectorAll('.boxSingleImg')

		let countDownCard = boxSingleImg.length

		for (let v = 0; v < countDownCard; v++) {
			boxSingleImg[v].style.display = 'none';
		}

		smallCardIndex++

		if (smallCardIndex > countDownCard) {
			smallCardIndex = 1
		}

		boxSingleImg[smallCardIndex - 1].style.display = 'flex'
	}

	return showSmallCard
}
const holdIt = smallCardAnimation()

// HANDLING MOUSEOVER OPERATION******
const smallHoverEffect = () => {
	let boxSingleImg = document.querySelectorAll('.boxSingleImg');
	
	boxSingleImg.forEach(cardImg => {
		cardImg.addEventListener('mouseover',  () => {
        clearInterval(smallCardIntervalId);
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
	smallCardIntervalId = setInterval(holdIt, 1500)
}
startInterval()
