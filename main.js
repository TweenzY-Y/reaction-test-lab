const hamburgerMenuElement = document.querySelector('.hamburger-menu');
const navElement = document.querySelector('ul');
const mainElement = document.querySelector('main');
const bodyElement = document.querySelector('body');
const navLinkElements = document.querySelectorAll('a');
const testBoxElement = document.querySelector('.test-box');
const tableElement = document.querySelector('tbody');
const collectionOfToggleElements = [hamburgerMenuElement,navElement,mainElement,bodyElement];
const settingsButtonElement = document.querySelector('#settings-btn');
const settingsPopupBackgroundElement = document.querySelector('.settings-popup-background');
const settingsPopupMainElement = document.querySelector('.settings-popup');
const saveSettingsButtonElement = document.querySelector('#save-settings-btn');
const resetSettingsButtonElement = document.querySelector('#reset-settings-btn');
const defaultColorSettings = {main:'#8685F0',waiting:'#a83554',ready:'#91ffa0'};
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

if (fetchedUserScores && fetchedUserScores.length > 0)
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
        const tableHTML = `<td>${position}</td><td>${score.time+'ms'}</td><td>${score.date}</td>
        <div class="overlay"><img src="resources/trashbin_icon.png" height="24" width="24" alt="trash bin icon"></div>`;
        const newRow = document.createElement("tr");
        newRow.innerHTML = tableHTML;
        tableElement.appendChild(newRow);
        position++;
    });

    const tableRowOverlay = document.querySelectorAll('.overlay');
    tableRowOverlay.forEach(overlay => {
    overlay.addEventListener('click',removeRow);
    
});
}
// HAMBURGER MENU AND MOBILE VIEW

hamburgerMenuElement.addEventListener('click',changeNavbarState);

navLinkElements.forEach(element => {
    element.addEventListener('click',changeNavbarState);
});

window.onresize = handleWindowResize;

function changeNavbarState(){
    if (window.innerWidth < 768)
    {
        collectionOfToggleElements.forEach(element => {
            element.classList.toggle('active');})
    }
}

function handleWindowResize(){
    if (window.innerWidth >= 768 && hamburgerMenuElement.classList.contains('active'))
    {
        collectionOfToggleElements.forEach(element => {
        element.classList.remove('active');})
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

// SCORE REMOVING

function removeRow(event){
    const index = event.target.closest('tr').firstChild.innerHTML-1;
    const row = event.target.closest('tr');
    row.parentNode.removeChild(row);
    fetchedUserScores.splice(index,1);
    localStorage.setItem('user-reactiontime-highscores',JSON.stringify(fetchedUserScores));
    displayUserScores();
    if (fetchedUserScores.length === 0)
    {
        tableElement.innerHTML = `<td colspan="3">You don't have any score</td>`;
    }
}

// COLOR SETTINGS

settingsButtonElement.addEventListener('click', changeSettingsPopupState);
settingsPopupBackgroundElement.addEventListener('click',()=>{
    changeSettingsPopupState();
    setColorPickerColors();
});

function changeSettingsPopupState(){
    settingsPopupBackgroundElement.classList.toggle('active');
    settingsPopupMainElement.classList.toggle('active');
    collectionOfToggleElements[3].classList.toggle('active');
}

let userColorSettings = JSON.parse(localStorage.getItem('user-settings'));
if (userColorSettings)
{
    setColorSettings();
    setColorPickerColors();
}

function setColorSettings(){
    const rootElement = document.querySelector(':root');
    for (const[state,color] of Object.entries(userColorSettings)){
        switch (state) {
        case 'main':
            rootElement.style.setProperty('--MAIN-COLOR',color);
            break;
        case 'waiting':
            rootElement.style.setProperty('--WAITING-COLOR',color);
            break;
        case 'ready':
            rootElement.style.setProperty('--READY-COLOR',color);
            break;
        default:
            break;
    }
    }
}

function setColorPickerColors()
{
    const rootElement = document.querySelector(':root');
    const colors = getComputedStyle(rootElement);
    document.querySelector('#main-color').value = colors.getPropertyValue('--MAIN-COLOR');
    document.querySelector('#waiting-color').value = colors.getPropertyValue('--WAITING-COLOR');
    document.querySelector('#ready-color').value = colors.getPropertyValue('--READY-COLOR');
}

saveSettingsButtonElement.addEventListener('click',() => {
    saveColorSettings();
    setColorSettings();
});
resetSettingsButtonElement.addEventListener('click',() =>{
    resetColorSettings();
    setColorSettings();
    setColorPickerColors();
});

function saveColorSettings(){
    userColorSettings= {
        main:`${document.querySelector('#main-color').value}`,
        waiting:`${document.querySelector('#waiting-color').value}`,
        ready:`${document.querySelector('#ready-color').value}`
    };
    localStorage.setItem('user-settings',JSON.stringify(userColorSettings));
}

function resetColorSettings(){
    userColorSettings = defaultColorSettings;
    localStorage.setItem('user-settings',JSON.stringify(userColorSettings));
}