const main = document.getElementById('main');
const addUserbtn = document.getElementById('add-user');
const doubleMoneybtn = document.getElementById('double-money');
const millionairesbtn = document.getElementById('Millionaires');
const sortRichestbtn = document.getElementById('Richest');
const calculateWealthbtn = document.getElementById('Wealth');

// Declaring a empty array

let data = [] ;

// default person using function
getRandomUser();


// fetching a random user and adding  money 


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}` ,
        money:  Math.floor(Math.random() * 10000)
    };
    
    addData(newUser);

}
 
// doubling the money
function doubleMoney(){
    data = data.map((user) => {
        return {...user , money: user.money * 2 };

    });
    updateDOM();
}

// filter only millionaires

function onlyMillionaires(){
    data = data.filter((user) => user.money >= 1000000);
    updateDOM();
}

// sorting by richest

function sortByRichest(){
    data = data.sort((a,b) => b.money - a.money);
    updateDOM();
}

// add total wealth
function Wealth(){
    var wealth = data.reduce((acc, user) => (acc += user.money),0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3> Total Wealth: ${formatMoney(wealth)}</h3>`
    main.appendChild(wealthElement);
}

// adding data to the Array

function addData(obj){
    
    data.push(obj);

    updateDOM();
}

// update DOM
function updateDOM(providedData = data){
    // clear main div
    main.innerHTML='<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((item) => {

    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(element);
    
    });


}

// format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&');
}

// event listener
addUserbtn.addEventListener('click', getRandomUser);
doubleMoneybtn.addEventListener('click', doubleMoney);
millionairesbtn.addEventListener('click', onlyMillionaires);
sortRichestbtn.addEventListener('click',sortByRichest);
calculateWealthbtn.addEventListener('click',Wealth);