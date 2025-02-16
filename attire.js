
// Handling the bigger view of the scroll Items
function biggerView(imgs) {
    let expandImg = document.querySelector('#expandedImg')

    let biggerViewContainer =
			document.querySelector(
				"biggerViewContainer"
			);

    // const windowHeight = window.innerHeight
    // let imgText = document.querySelector('#imgText')

    // biggerViewContainer.style.height = (windowHeight) + 'px'

    expandImg.src = imgs.src
    imgText.innerHTML = imgs.alt

    expandImg.parentElement.parentElement.parentElement.style.display =
			"flex";
}
