import { getAdsList } from "./modules.js";
import small from "./smallAds.js";
import { Counter } from "./counterComponent.js";

// Get references for the initially present count displays and toggle buttons
// These will likely be empty or a subset of the final elements
const initialCountDisplays =
	document.querySelectorAll(".countPress");
const initialToggleButtons =
	document.querySelectorAll(".fa-heart");

const LOCAL_STORAGE_HOLD =
	"multipleCounterCount_";

// Create an array to hold our Counter instances
const counters = [];
const shouldIncrementState = [];

function updateCountDisplay(
	index,
	countDisplayElement,
	toggleButtonElement
) {
	const currentCount = counters[index].getCount();
	countDisplayElement.textContent = currentCount;
	localStorage.setItem(
		`${LOCAL_STORAGE_HOLD}${index}`,
		currentCount
	);
	// Assuming the toggle text is within the heart icon itself
	if (toggleButtonElement) {
		toggleButtonElement.textContent =
			shouldIncrementState[index]
				? "Increment"
				: "Decrement";
	}
}

document.addEventListener(
	"DOMContentLoaded",
	() => {
		// Initialize counters for the elements that are present in the initial HTML
		initialToggleButtons.forEach(
			(button, index) => {
				const storedCount = localStorage.getItem(
					`${LOCAL_STORAGE_HOLD}${index}`
				);
				const initialCount =
					storedCount !== null
						? parseInt(storedCount, 10)
						: 0;
				const counter = new Counter(initialCount);
				counters.push(counter);
				shouldIncrementState.push(true); // Initialize the increment state

				// Assuming the corresponding count display is the next sibling
				const countDisplayElement =
					initialCountDisplays[index];
				if (countDisplayElement) {
					updateCountDisplay(
						index,
						countDisplayElement,
						button
					);
				}

				// We are now using event delegation for dynamically added elements,
				// so we don't need individual event listeners here for the initial buttons.
			}
		);
		
		// Event delegation for "Show Me Love" heart buttons
		const beadsContainer = document.querySelector('.beadsContainer');
		if (beadsContainer) {
			beadsContainer.addEventListener('click', (event) => {
				const heartButton = event.target.closest('.fa-heart');
				if (heartButton) {
					const beadCard = heartButton.closest('.beads');
					if (beadCard) {
						const index = Array.from(beadsContainer.children).indexOf(beadCard);
						if (counters[index]) {
							if (shouldIncrementState[index]) {
								counters[index].increment();
							} else {
								counters[index].decrement();
							}
							shouldIncrementState[index] = !shouldIncrementState[index];

							const countDisplayElement = heartButton.nextElementSibling;
							if (countDisplayElement && countDisplayElement.classList.contains('countPress')) {
								countDisplayElement.textContent = counters[index].getCount();
								localStorage.setItem(
									`${LOCAL_STORAGE_HOLD}${index}`,
									counters[index].getCount()
								);
							}

							// Toggle CSS classes for the heart icon
							if (shouldIncrementState[index]) {
								heartButton.classList.add('heart-increment');
								heartButton.classList.remove('heart-decrement');
							} else {
								heartButton.classList.remove('heart-increment');
								heartButton.classList.add('heart-decrement');
							}
						} else {
							console.warn(`Counter not found for card at index ${index}`);
						}
					}
				}
			});
		}

		// Event delegation for heart buttons in the big card slider
		const adsCardsContainer = document.querySelector('.adsCards');
		if (adsCardsContainer) {
			adsCardsContainer.addEventListener('click', (event) => {
				const heartButton = event.target.closest('.fa-heart');
				if (heartButton) {
					const infoHolder = heartButton.closest('.infoHolder');
					if (infoHolder) {
						const index = Array.from(adsCardsContainer.children).indexOf(infoHolder);
						if (counters[index + initialToggleButtons.length]) {
							if (shouldIncrementState[index + initialToggleButtons.length]) {
								counters[index + initialToggleButtons.length].increment();
							} else {
								counters[index + initialToggleButtons.length].decrement();
							}
							shouldIncrementState[index + initialToggleButtons.length] = !shouldIncrementState[index + initialToggleButtons.length];

							const countDisplayElement = heartButton.nextElementSibling;
							if (countDisplayElement && countDisplayElement.classList.contains('countPress')) {
								countDisplayElement.textContent = counters[index + initialToggleButtons.length].getCount();
								localStorage.setItem(
									`${LOCAL_STORAGE_HOLD}${index + initialToggleButtons.length}`,
									counters[index + initialToggleButtons.length].getCount()
								);
							}

							// Toggle CSS classes for the heart icon in the big card
							if (shouldIncrementState[index + initialToggleButtons.length]) {
								heartButton.classList.add('heart-increment');
								heartButton.classList.remove('heart-decrement');
							} else {
								heartButton.classList.add('heart-decrement');
								heartButton.classList.remove('heart-increment');
							}
						} else {
							console.warn(`Counter not found for big card at index ${index}`);
						}
					}
				}
			});
		}
		small();

		getAdsList().then((result) => {
			if (result !== null) {
				console.log(result);
			}

			const beadsMainCards = () => {
				let beadsContainer =
					document.querySelector(
						".beadsContainer"
					);
				if (!beadsContainer) return; // Exit if the container doesn't exist
				beadsContainer.innerHTML = "";
				if (
					Array.isArray(result) &&
					result.length > 2 &&
					Array.isArray(result[2])
				) {
					result[2].forEach((beadElements) => {
						let newBeadCards =
							document.createElement("article");
						newBeadCards.classList.add("beads");
						newBeadCards.dataset.id =
							beadElements.id;
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
                        </div>`;
						beadsContainer.appendChild(
							newBeadCards
						);

						// Initialize a new counter and state for each dynamically added card
						const counter = new Counter(0);
						counters.push(counter);
						shouldIncrementState.push(true);

						// Optionally, update the display here if needed immediately after creation
						// However, the event listener will handle updates on clicks.
					});
				} else {
					console.error(
						"Result or result[2] is not a valid array for beadsMainCards"
					);
				}
			};

			beadsMainCards();

			// Big Card Slider for lingerie.html
			const beadsBoardAds = () => {
				let badgeInfo =
					document.querySelector(".adsCards");
				if (!badgeInfo) return; // Exit if the container doesn't exist
				badgeInfo.innerHTML = "";

				if (
					Array.isArray(result) &&
					result.length > 2 &&
					Array.isArray(result[2])
				) {
					result[2].forEach((currentItem) => {
						let newCard =
							document.createElement("div");
						newCard.classList.add("infoHolder");
						newCard.dataset.id = currentItem.id;
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
                        </div>`;
						badgeInfo.appendChild(newCard);

						// Initialize a new counter and state for each dynamically added big card
						const counter = new Counter(0);
						counters.push(counter);
						shouldIncrementState.push(true);
					});
				} else {
					console.error(
						"Result or result[2] is not a valid array for beadsBoardAds"
					);
				}

				BigCardAnimation();
				BigHoverEffect();
			};
			beadsBoardAds();
		});
	}
);

// Big Card Animation********
let BigCardIntervalId;
let isPaused = false;

const BigCardAnimation = () => {
	let BigCardIndex = 0;
	const BigCardsCount = () => {
		let infoHolder = document.querySelectorAll(
			".infoHolder"
		);
		let countBigCard = infoHolder.length;

		for (let B = 0; B < countBigCard; B++) {
			infoHolder[B].style.display = "none";
		}

		BigCardIndex++;

		if (BigCardIndex > countBigCard) {
			BigCardIndex = 1;
		}

		if (window.innerWidth < 1191) {
			infoHolder[BigCardIndex - 1].style.display =
				"flex";
		} else {
			infoHolder[BigCardIndex - 1].style.display =
				"grid";
		}
	};

	return BigCardsCount;
};

const BigHoldIt = BigCardAnimation();

// Big Card Slider Timer*******
const BigCardTimerInterval = () => {
	BigCardIntervalId = setInterval(
		BigHoldIt,
		1000
	);
};
BigCardTimerInterval();
// Big Card Slider *******
const BigHoverEffect = () => {
	let infoHolder = document.querySelectorAll(
		".infoHolder"
	);

	infoHolder.forEach((BigCardImg) => {
		BigCardImg.addEventListener(
			"mouseover",
			() => {
				clearInterval(BigCardIntervalId);
				isPaused = true;
			}
		);

		BigCardImg.addEventListener(
			"mouseleave",
			() => {
				isPaused = false;
				BigCardTimerInterval();
			}
		);
	});
};
