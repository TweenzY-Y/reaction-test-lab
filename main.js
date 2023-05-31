const hamburgerMenuButton = document.querySelector('.hamburger-menu');
const navElement = document.querySelector('ul');
const mainElement = document.querySelector('main');
const bodyElement = document.querySelector('body');
const navButtonsElement = document.querySelectorAll('a');
const testBoxElement = document.querySelector('.test-box');

const min = 1000;
const max = 4000;
let triesCounter = 0;
let userScores = [];
let start;

// HAMBURGER MENU
hamburgerMenuButton.addEventListener('click', changeNavBarState);

for(element of navButtonsElement)
{
    element.addEventListener('click',changeNavBarState);
}

window.onresize = handleWindowResize;

function changeNavBarState(){
    if(window.innerWidth <= 768)
    {
        hamburgerMenuButton.classList.toggle('active');
        navElement.classList.toggle('active');
        mainElement.classList.toggle('active');
        bodyElement.classList.toggle('active');
    }
}

function handleWindowResize(){
    if (window.innerWidth >= 768 && hamburgerMenuButton.classList.contains('active'))
    {
        changeNavBarState();
    }
}


// TEST
testBoxElement.addEventListener('mousedown', playTest);

function playTest(){
    reactionTime = Date.now() - start;
    const testState = document.querySelector('.test-box').classList[1];
    switch (testState) {
        case 'waiting':
            changeSecondClass(testBoxElement,'failed');
            testBoxElement.innerHTML = '<h2>Too soon</h2><p>Try again</p>';
            clearTimeout(callTest);
            break;
        case 'ready':
            reactionTime = Date.now() - start;
            userScores.push(reactionTime);
            triesCounter++;
            if (triesCounter === 5)
            {
                changeSecondClass(testBoxElement,'finished');
                const userAverage = userScores.reduce((a, b) => a + b, 0) / 5;
                testBoxElement.innerHTML = `<h2>${reactionTime}ms</h2><p>${triesCounter} of 5</p><p>You average was: <span class="average-score">${userAverage}ms</span></p>`;
                triesCounter = 0;
                userScores = [];
                break;
            }
            else{
                changeSecondClass(testBoxElement,'succeeded');
                testBoxElement.innerHTML =  testBoxElement.innerHTML = `<h2>${reactionTime}ms</h2><p>${triesCounter} of 5</p><p>Click for next try</p>`;
                break;
            }
        default:
            createNewTest();
            break;
    }
}

function createNewTest(){
    changeSecondClass(testBoxElement,'waiting');
    testBoxElement.innerHTML = '<h2>Wait...</h2>';
    randNum =  Math.floor(Math.random() * (max - min + 1)) + min;
    callTest = setTimeout(function(){
    start = Date.now();
    changeSecondClass(testBoxElement,'ready');
    testBoxElement.innerHTML = '<h2>Now!</h2>'; }, randNum);
}
function changeSecondClass(element,className){
    const elementClasses = element.getAttribute('class');
    const classesArray = elementClasses.split(' ');
    classesArray[1] = className;
    const updatedElementClasses = classesArray.join(' ');
    element.setAttribute('class', updatedElementClasses); 
}
