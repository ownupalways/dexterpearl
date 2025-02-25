import imgItems from "./generalScript.js";

const getCardList = async () => {
	const cardList = await imgItems()
	

	if (cardList === null) {
		console.log(`Failed to loads items`)

		return
	}

	let badgeSingle = document.querySelector('.badgeSingle')

	badgeSingle.innerHTML = ` `
	if (Array.isArray(cardList[0])) {
		cardList[0].forEach(item => {
			let swiftItem = document.createElement('div')
			swiftItem.classList.add('badgeSingleImg')
			swiftItem.dataset.id = item.id
			swiftItem.innerHTML = `
						<div class="boxSingleImg">
							<img src="${item.image}" alt="" loading="lazy">
							<div class="badgeSingleInfo">
								<h3 class="h3">${item.title}</h3>
								<p class="textY">
									${item.description} 
								</p>
								<a href="http://127.0.0.1:5500/images/2.jpg">Learn More</a>
							</div>
						</div>
					`
			badgeSingle.appendChild(swiftItem)
			// console.log(`Items:`, item)
			
		})
	} else {
		console.log("cardList is not an Array")
	}
	
	hoverEffect()
	swiftAnimation()
}

getCardList()

// SWIFT ITEM CARD ANIMATION **********
let intervalId;
let isPaused = false;
const swiftAnimation = () => {
		let swiftCardIndex = 0;
	const showSwiftCard = () => {
		let badgeSingleImg = document.querySelectorAll('.badgeSingleImg')

		let countDownCard = badgeSingleImg.length

		for (let v = 0; v < countDownCard; v++) {
			badgeSingleImg[v].style.display = 'none';
		}

		swiftCardIndex++

		if (swiftCardIndex > countDownCard) {
			swiftCardIndex = 1
		}

		badgeSingleImg[swiftCardIndex - 1].style.display = 'flex'

		startInterval()
	}

	showSwiftCard()
}

const startInterval = () => {
	if (!isPaused) {
		intervalId = setInterval(swiftAnimation, 1000);
	}
	// swiftAnimation()
}

const hoverEffect = () => {
	let badgeSingleInfo = document.querySelectorAll('.badgeSingleInfo')
	
	let activeInfo
	for (let d = 0; d < badgeSingleInfo.length; d++) {
		 activeInfo = badgeSingleInfo[d];

		activeInfo.addEventListener('mouseover', () => {
			clearInterval(intervalId)
			isPaused = true;
		})

		activeInfo.addEventListener('mouseout', () => {
			isPaused = false;
			startInterval()
		})
	}

	// let boxSingleImg = document.querySelectorAll('.boxSingleImg')

	// let activeCard
	// for (let i = 0; i < boxSingleImg.length; i++) {
	// 	 activeCard = boxSingleImg[i];
		
	// }
}


// let intervalId
// let isPaused = false; //Flag to track pause this.state.

// function startInterval() {
// 	if (!isPaused) {
// 		//Only start if not already paused
// 		intervalId = setInterval(myFunction, 1000); // Your desired interval
// 	}
// }

// function pauseInterval() {
// 	clearInterval(intervalId);
// 	isPaused = true;
// }

// function resumeInterval() {
// 	isPaused = false;
// 	startInterval(); // Restart the interval
// }

// function myFunction() {
// 	console.log("Interval running"); //Your interval function
// 	//...your code to be executed at intervals...
// }

// //Start the interval initially

// startInterval()

// // const myElement = document.getElementById("myElement"); //The element you want to hover over
