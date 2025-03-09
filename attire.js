
import imgItems from './generalScript.js';

// function biggerView(imgs) {
// 	let expandImg = document.querySelector(
// 		"#expandedImg"
// 	);

// 	let imgText = document.querySelector("#imgText")
// 	let biggerViewContainer = document.querySelector('.biggerViewContainer')


// 	expandImg.src = imgs.src;
// 	imgText.innerHTML = imgs.alt;

// 	biggerViewContainer = expandImg.parentElement.parentElement.parentElement.parentElement

// 	if (biggerViewContainer) {
// 		biggerViewContainer.style.display =
// 		"flex";
// 	} else {
// 		console.log("Expanded image container not Found!")
// 	}
// }

let cardList = []
const appItems = async () => {
	try {
		
		cardList = await imgItems()

		if (!cardList || !Array.isArray(cardList[1]) ) {
			console.log(`failed to load items`)

			return
		}

		let littleItems = document.querySelector('.littleItems')

		if (!littleItems) {
			console.log("little items container not found.")

			return
		}

		littleItems.innerHTML = ''

			cardList[1].forEach(cardUp => {
				let modalContent = document.createElement('article')
				modalContent.classList.add('lItem')
				modalContent.dataset.id = cardUp.id
				modalContent.innerHTML = ` 
				<img src="${cardUp.image}">
				<div class="learnMoreCont">
					<button class="learnMore"> Learn More </button>
				</div>
				`
				littleItems.appendChild(modalContent)
				

				// modalContent.querySelector('img').addEventListener('click', () => {
				// 	biggerView(this)
				// })
			})
		} catch (error) {
			console.log(`cardList is not an Array`, error)	
	}
	
};

appItems();


// ---ADD ITEM TO MODAL BOX DISPLAY WITH content
	let littleItems = document.querySelector('.littleItems')

		littleItems.addEventListener('click', (event) => {
			let positionClicked = event.target

			let knockId = positionClicked.parentElement.parentElement.dataset.id
			
			displayModalBox(knockId)

	})


const displayModalBox = (knockId) => {
	let expandImg = document.querySelector(
		"#expandedImg"
	);

	let headings = document.querySelector('.headings')
	let imgText = document.querySelector("#imgText")
	let biggerViewContainer = document.querySelector('.biggerViewContainer')

	let modalCard = document.createElement(`div`)
		modalCard.classList.add(`biggerView`)
		modalCard.dataset.id = knockId
	let OnenessId = cardList[1].findIndex((value) => value.id == knockId)
	let cardProperties = cardList[1][OnenessId]
	
	console.log(cardProperties)


	expandImg.src = `${cardProperties.image}`;
	imgText.innerHTML = `${cardProperties.description}`;
	headings.innerHTML = `${cardProperties.title}`

	biggerViewContainer = expandImg.parentElement.parentElement.parentElement.parentElement

	if (biggerViewContainer) {
		biggerViewContainer.style.display =
		"flex";
	} else {
		console.log("Expanded image container not Found!")
	}
} 


let itemInfoBtn = document.querySelector('#itemInfo')
let closeInfoBtn = document.querySelector('#closeInfoBtn') 
let imgTextCont = document.querySelectorAll("#imgTextCont")


if (window.innerWidth < 650) {
		closeInfoBtn.addEventListener('click', () => {
			for (let i = 0; i < imgTextCont.length; i++) {
			let textCont = imgTextCont[i];
			textCont.style.bottom = '-100%'
			itemInfoBtn.style.display = 'block'
			closeInfoBtn.style.display = 'none'
		}
	})
} else {
		closeInfoBtn.addEventListener('click', () => {
			for (let i = 0; i < imgTextCont.length; i++) {
			let textCont = imgTextCont[i];
			textCont.style.display = 'none'
			itemInfoBtn.style.display = 'block'
			closeInfoBtn.style.display = 'none'
		}
	})
}

	if (window.innerWidth < 650) {
		itemInfoBtn.addEventListener('click', () => {	
			for (let i = 0; i < imgTextCont.length; i++) {
				let textCont = imgTextCont[i];
				textCont.style.bottom = '0'
				itemInfoBtn.style.display = 'none'
				closeInfoBtn.style.display = 'flex'
			}
		})
	} else {
		itemInfoBtn.addEventListener('click', () => {	
		for (let i = 0; i < imgTextCont.length; i++) {
			let textCont = imgTextCont[i];
			textCont.style.display = 'block'
			itemInfoBtn.style.display = 'none'
			closeInfoBtn.style.display = 'flex'
		}
	})
}
