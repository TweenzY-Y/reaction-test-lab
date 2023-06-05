const hamburgerMenuElement = document.querySelector('.hamburger-menu');
const navElement = document.querySelector('ul');
const mainElement = document.querySelector('main');
const bodyElement = document.querySelector('body');
const navLinkElements = document.querySelectorAll('a');
const testBoxElement = document.querySelector('.test-box');
const tableElement = document.querySelector('tbody');
const collectionOfToggleElements = [hamburgerMenuElement,navElement,mainElement,bodyElement];
const currentDate = getCurrentDate();

// SETTINGS

const minWaitingTime = 2000;
const maxWaitingTime = 4000;

// TEMP VARIABLES

let attemptCounter = 0;
let userAttemptData = [];
let startTime;

// FETCHING USER SCORES FROM LOCALSTORAGE
let fetchedUserScores = JSON.parse(localStorage.getItem('user-reactiontime-highscores'));

if (fetchedUserScores)
{
    displayUserScores();
}
else
{
    fetchedUserScores = [];
}

function displayUserScores()
{
    tableElement.innerHTML = '';
    let position = 1;
    fetchedUserScores.forEach(score => {
        const tableHTML = `<td>${position}</td><td>${score.time+'ms'}</td><td>${score.date}</td>`;
        const newRow = document.createElement("tr");
        newRow.innerHTML = tableHTML;
        tableElement.appendChild(newRow);
        position++;
    });
}
// HAMBURGER MENU AND MOBILE VIEW

hamburgerMenuElement.addEventListener('click',changeNavbarState);

navLinkElements.forEach(element => {
    element.addEventListener('click',changeNavbarState);
});

window.onresize = handleWindowResize;

function changeNavbarState(){
        collectionOfToggleElements.forEach(element => {
            element.classList.toggle('active');
}
)}

function handleWindowResize(){
    if (window.innerWidth > 768 && hamburgerMenuElement.classList.contains('active'))
    {
        changeNavbarState();
    }
}

// TEST

testBoxElement.addEventListener('mousedown', playTest);

function playTest(){
    const testState = document.querySelector('.test-box').classList[1];
    switch (testState){
        case 'waiting':
            changeTestState(testBoxElement,'failed');
            testBoxElement.innerHTML = '<h2>Too soon</h2><p>Try again</p>';
            clearTimeout(callAttempt);
            break;
        case 'ready':
            userAttemptResult = Date.now() - startTime;
            userAttemptData.push(userAttemptResult);
            attemptCounter++;
            if (attemptCounter === 5)
            {
                changeTestState(testBoxElement,'finished');
                const userAverageScore = userAttemptData.reduce((a, b) => a + b, 0) / 5;
                testBoxElement.innerHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>You average was: <span class="average-score">${userAverageScore}ms</span></p>`;
                attemptCounter = 0;
                userAttemptData = [];

                fetchedUserScores.push({time:`${userAverageScore}`,date:`${currentDate}`});
                fetchedUserScores.sort((a, b) => {

                if (a.time < b.time) {
                    return -1;
                } else if (a.time > b.time) {
                    return 1;
                } else {
                    return 0;
                }
                });

                fetchedUserScores = fetchedUserScores.slice(0,10);
                localStorage.setItem('user-reactiontime-highscores',JSON.stringify(fetchedUserScores));

                displayUserScores();
                break;
            }
            else{
                changeTestState(testBoxElement,'succeeded');
                testBoxElement.innerHTML = `<h2>${userAttemptResult}ms</h2><p>${attemptCounter} of 5</p><p>Click for next try</p>`;
                break;
            }
        default:
            createNewTest();
            break;
    }
}

function createNewTest(){
    changeTestState(testBoxElement,'waiting');
    testBoxElement.innerHTML = '<h2>Wait...</h2>';
    randomWaitingTime = Math.floor(Math.random() * (maxWaitingTime - minWaitingTime + 1)) + minWaitingTime;
    callAttempt = setTimeout(function()
    {
        startTime = Date.now();
        changeTestState(testBoxElement,'ready');
        testBoxElement.innerHTML = '<h2>Now!</h2>'; 
    },randomWaitingTime);
}

function changeTestState(element,className){
    const elementClasses = element.getAttribute('class');
    const classesArray = elementClasses.split(' ');
    classesArray[1] = className;
    const updatedElementClasses = classesArray.join(' ');
    element.setAttribute('class', updatedElementClasses); 
}


// DATE

function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${day}.${month}.${year}`;
}