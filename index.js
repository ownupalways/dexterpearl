const IndexLandingAnimate = () => {
    window.onload = () => {
        if (window.innerWidth < 768) {
            clearTimeout(swing)
        } else {
            swing()
        }
    }

    let swingInTimer
    let swingOutTimer
    
    const swing = () => {
        swingInTimer = setTimeout(loadCont, 500)
        swingOutTimer = setTimeout(loadBoth, 1000)
    }


    let loadDisplay = document.querySelector('.loadDisplay')
    let logoView = document.querySelector('.logoView')
    let welcomeNote = document.querySelector('.welcomeNote')
    let landingCloseBtn = document.querySelector('.landingCloseBtn')

    const loadCont = () => {
    if (window.getComputedStyle(loadDisplay).display === 'none') {
            loadDisplay.style.display = 'flex'
        }
    }

    const loadBoth = () => {
        logoView.style.left = "0"
        welcomeNote.style.right = "0"
    }

    const loadContOut = () => {
        if (loadDisplay.style.display == 'flex') {
            loadDisplay.style.display = 'none'
        }
    }

    const loadBothOut = () => {
        logoView.style.left = "-100%"
        welcomeNote.style.right = "-100%"
    }

    landingCloseBtn.addEventListener('click', () => {
        setTimeout(loadContOut, 500)
        loadBothOut()
    })
}

IndexLandingAnimate()
