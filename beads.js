import { getAdsList } from "./modules.js";
import small from "./smallAds.js";
small()

getAdsList().then(result => {
    if (result !== null) {
        console.log(result)
    }

    const beadsMainCards = () => {
        let beadsContainer = document.querySelector('.beadsContainer')
        beadsContainer.innerHTML = ''
        result[2].forEach(beadElements => {
            let newBeadCards = document.createElement('article')
            newBeadCards.classList.add('beads')
            newBeadCards.dataset.id = beadElements.id
            newBeadCards.innerHTML = `
            <img src="${beadElements.image}" alt="" loading="lazy">
				<div class="showCont">
					<h2>Show Me Love</h2>
					<div class="showMeLove actionBtns">
						<div class="action_Count">
                            <i class="fas fa-heart"></i>
                            <span class="countPress">0</span>
                        </div>
                        <div class="action_Count">
                            <i class="fas fa-share-alt"></i>
                            <span class="countPress">0</span>
                        </div>
						<button class="needThis">I need This</button>
					</div>
				</div>`
            beadsContainer.appendChild(newBeadCards)
        });
    }
    
    beadsMainCards()

    

	// Big Card Slider for lingerie.html
    const beadsBoardAds = () => {
        let badgeInfo = document.querySelector('.adsCards') 
		
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
						<div class="productInfo_Action">
							<h3>${currentItem.title}</h3>
							<p class="inText">
								${currentItem.description}
							</p>
							<div class="showMeLove actionBtns">
								<div class="action_Count">
									<i class="fas fa-heart"></i>
									<span class="countPress">0</span>
								</div>
								<div class="action_Count">
									<i class="fas fa-share-alt"></i>
									<span class="countPress">0</span>
								</div>
								<button class="needThis topNeeds">I need This</button>
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
	beadsBoardAds()
})

// Big Card Animation********
let BigCardIntervalId
let isPaused = false

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

		if (window.innerWidth < 1191) {
			infoHolder[BigCardIndex - 1].style.display = 'flex'
		} else {
			infoHolder[BigCardIndex - 1].style.display = 'grid'
		} 

	}

	return BigCardsCount
}

const BigHoldIt = BigCardAnimation()

// Big Card Slider Timer*******
const BigCardTimerInterval = () => {
	BigCardIntervalId = setInterval(BigHoldIt, 1000)
}
BigCardTimerInterval()
// Big Card Slider *******
const BigHoverEffect = () => {
	let infoHolder = document.querySelectorAll('.infoHolder')

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
