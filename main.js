//Main content on load
const mainInput = document.querySelector('.main-input');
const mainList = document.querySelector('.main-list');
const filterBox = document.querySelector('.filter-box');
const spanCounter = document.querySelector('.counter');
const allButton = document.querySelector('#all-button');
const activeButton = document.querySelector('#active-button');
const completedButton = document.querySelector('#completed-button');
const clearButton = document.querySelector('#clear-button');

//Created because we need to reach it outside function
let listItem;
//Array for list items
let itemsArray = [];

let counter = 0;
let checked = false;

mainInput.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        createList(mainInput.value);
        counterChange(1);
        mainInput.value = '';
        filters();
    }
});

function createList(labelText){
//Content being created
    listItem = document.createElement('li');
    const divItem = document.createElement('div');
    const labelItem = document.createElement('label');
    const checkItem = document.createElement('input');

    checkItem.type = 'checkbox';

    divItem.classList.add('list-div');

    labelItem.textContent = labelText;

    mainList.appendChild(listItem);
    listItem.appendChild(divItem);
    divItem.appendChild(checkItem);
    divItem.appendChild(labelItem);

    checkItem.addEventListener('change', function () {
        if (checkItem.checked) {
            counterChange(0);
            checked = true;
            console.log(labelItem.textContent + ' ' + checked);
        } else {
            counterChange(1);
            checked = false;
            console.log(labelItem.textContent + ' ' + checked);
        }
    });
    itemsArray.push({ listItem, checkItem });
}
function counterChange(change){
    if(change === 1){
        counter++;
        spanCounter.textContent = counter;
    }else if(change === 0){
        counter--;
        spanCounter.textContent = counter;
    }
}

allButton.onclick = function (){
    for (const { listItem, checkItem } of itemsArray) {
        
            listItem.style.display = 'block';
        
    }
}
activeButton.onclick = function (){
    for (const { listItem, checkItem } of itemsArray) {
        if (checkItem.checked) {
            listItem.style.display = 'none';
        }else{
            listItem.style.display = 'block';
        }
    }
}
completedButton.onclick = function (){
    for (const { listItem, checkItem } of itemsArray) {
        if (!checkItem.checked) {
            listItem.style.display = 'none';
        }else{
            listItem.style.display = 'block';
        }
    }
}
clearButton.onclick = () => {
    for (const { listItem, checkItem } of itemsArray) {
        if (checkItem.checked) {
            listItem.remove();
        }
    }
    filters();
}
//Function for looping through itemlist and checking if checked or not

function filters(){
    if(counter > 0){
        filterBox.style.display = 'block';
    }else{
        filterBox.style.display = 'none';
    }
}