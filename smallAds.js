import { getAdsList } from "./modules.js";

const small = () => {
    getAdsList().then(result => {
    if (result !== null) {
        console.log(result)
    }

        // Small Slider Display for lingerie.html
	const smallSliderCard = () => {
		let adsCont = document.querySelector('.adsCont')

		adsCont.innerHTML = ` `
		if (Array.isArray(result[0])) {
			result[0].forEach(item => {
				let swiftItem = document.createElement('div')
				swiftItem.classList.add('adsBox')
				swiftItem.dataset.id = item.id
				swiftItem.innerHTML = `
								<img src="${item.image}" alt="" loading="lazy">
								<div class="adsInfo">
									<h3 class="h3">${item.title}</h3>
									<p class="textY">
										${item.description} 
									</p>
									<a href="http://127.0.0.1:5500/images/2.jpg">Learn More</a>
								</div>
						`
				adsCont.appendChild(swiftItem)
			})
		} else {
			console.log("cardList is not an Array")
		}
		// smallCardAnimation()
    }
        
	smallSliderCard()
    // Small Cards ANIMATION **********
    let smallCardIntervalId;
    let isPaused = false;
    const smallCardAnimation = () => {
        let smallCardIndex = 0;
        const showSmallCard = () => {
            let adsBox = document.querySelectorAll('.adsBox')

            let countDownCard = adsBox.length

            for (let v = 0; v < countDownCard; v++) {
                adsBox[v].style.display = 'none';
            }

            smallCardIndex++

            if (smallCardIndex > countDownCard) {
                smallCardIndex = 1
            }

            adsBox[smallCardIndex - 1].style.display = 'flex'
        }

        return showSmallCard
    }
    
    const holdIt = smallCardAnimation()

    // HANDLING MOUSEOVER OPERATION******
    const smallHoverEffect = () => {
        let adsBox = document.querySelectorAll('.adsBox');
        
        adsBox.forEach(cardImg => {
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

	smallHoverEffect()
        

    // SLIDER TIMER****
    const startInterval = () => {
        smallCardIntervalId = setInterval(holdIt, 1500)
    }
    startInterval()
    })
}

export default small
