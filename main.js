//Main content on load
const mainInput = document.querySelector('.main-input');
const mainList = document.querySelector('.main-list');
const filterBox = document.querySelector('.filter-box');
const spanCounter = document.querySelector('.counter');
const allButton = document.querySelector('#all-button');
const activeButton = document.querySelector('#active-button');
const completedButton = document.querySelector('#completed-button');
const clearButton = document.querySelector('#clear-button');
const checkAllButton = document.querySelector('.check-all');

//Array for list items
let itemsArray = [];

let counter = 0;
let itemStatus = 'all';

mainInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && mainInput.value.length > 0) { //Change s weird thing to someting better
        createList(mainInput.value);
        counterChange(1);
        mainInput.value = '';
        filters();
    }
});

function createList(labelText) {
    //Content being created
    const listItem = document.createElement('li');
    const divItem = document.createElement('div');
    const labelItem = document.createElement('label');
    const checkItem = document.createElement('input');
    const xButton = document.createElement('button');

    xButton.classList.add('x-buttons');
    xButton.textContent = '❌';


    checkItem.type = 'checkbox';
    checkItem.classList.add('checkboxes');

    divItem.classList.add('list-div');

    labelItem.textContent = labelText;
    labelItem.classList.add('labels');

    mainList.appendChild(listItem);
    listItem.appendChild(divItem);
    divItem.appendChild(checkItem);
    divItem.appendChild(labelItem);
    divItem.appendChild(xButton);

    xButton.onclick = function () {
        removeListItem(listItem, checkItem);
    }

    divItem.addEventListener('dblclick', function () {
        labelItem.contentEditable = true;
        labelItem.focus();

        labelItem.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                labelItem.contentEditable = false;
            }
        });

        // Handle blur event to check for empty content when focus is lost
        labelItem.addEventListener('blur', function () {
            if (labelItem.textContent.trim().length === 0) {
                removeListItem(listItem, checkItem);
            }
            labelItem.contentEditable = false;
        });
    });


    checkItem.addEventListener('change', function () {
        if (checkItem.checked) {
            counterChange(0);
            labelItem.classList.add('completed');
        } else {
            counterChange(1);
            labelItem.classList.remove('completed');
        }
    });

    itemsArray.push({ listItem, checkItem, labelItem });
}

function counterChange(change) {
    if (change === 1) {
        counter++;
        spanCounter.textContent = counter;

    } else if (change === 0) {
        counter--;
        spanCounter.textContent = counter;
    }
}

function allFunction() {
    for (const { listItem } of itemsArray) {

        listItem.style.display = 'block';

    }
    itemStatus = 'all';
    borderFunction();
}
allButton.onclick = allFunction;

function activeFunction() {
    for (const { listItem, checkItem } of itemsArray) {
        if (checkItem.checked) {
            listItem.style.display = 'none';
        } else {
            listItem.style.display = 'block';
        }
    }
    itemStatus = 'active';
    borderFunction();
}
activeButton.onclick = activeFunction;

function completedFunction() {
    for (const { listItem, checkItem } of itemsArray) {
        if (!checkItem.checked) {
            listItem.style.display = 'none';
        } else {
            listItem.style.display = 'block';
        }
    }
    itemStatus = 'completed';
    borderFunction();
}
completedButton.onclick = completedFunction;

clearButton.onclick = () => {
    for (const { listItem, checkItem } of itemsArray) {
        if (checkItem.checked) {
            removeListItem(listItem, checkItem);
        }
    }
    filters();
}

checkAllButton.onclick = function () {
    const allChecked = itemsArray.map(item => item.checkItem.checked).every(checked => checked);

    for (const { checkItem, labelItem } of itemsArray) {

        if (checkItem.checked == false) {
            checkItem.checked = true;
            labelItem.classList.add('completed');
            counterChange(0);
        } else if (allChecked) {
            checkItem.checked = false;
            labelItem.classList.remove('completed');
            counterChange(1);
        }
    }
}

//Function for looping through itemlist and checking if checked or not

function filters() {
    if (itemsArray.length > 0) {
        filterBox.style.display = 'block';
        checkAllButton.style.display = 'block';

    } else {
        filterBox.style.display = 'none';
        checkAllButton.style.display = 'none';
    }
}
function removeListItem(listItem, checkItem) {
    listItem.remove();

    itemsArray = itemsArray.filter(item => item.listItem !== listItem);

    if (!checkItem.checked) {
        counterChange(0);
    }
    filters();
}
function borderFunction() {
    switch (itemStatus) {
        case 'all': {
            allButton.classList.add('active');
            activeButton.classList.remove('active');
            completedButton.classList.remove('active');
            break;
        }
        case 'active': {
            allButton.classList.remove('active');
            activeButton.classList.add('active');
            completedButton.classList.remove('active');
            break;
        }
        case 'completed': {
            allButton.classList.remove('active');
            activeButton.classList.remove('active');
            completedButton.classList.add('active');
            break;
        }
    }
}