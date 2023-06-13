const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const listel = document.getElementById('list');
const formel = document.getElementById('form');
const textel = document.getElementById('text');
const amountel = document.getElementById('amount');

let transaction = [];

function init() {
    listel.innerHTML = '';
    transaction.forEach(addDataToList);
    calculateMoney();

}
function addDataToList(transaction) {

    const symbol = transaction.amountel < 0 ? "-" : "+";

    const status = transaction.amountel < 0 ? "minus" : "plus";

    const item = document.createElement('li')

    const result = numberWithCommas(Math.abs(transaction.amountel));
    item.innerHTML = `${transaction.textel} <sapn> ${symbol}${result} </span><button class = "delete-btn" onclick ="removeData(${transaction.id})">X</button>`
    item.classList.add(status)
    listel.appendChild(item)
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function autoID(){
    return Math.floor(Math.random()*100000000000)
}
function calculateMoney() {
    const amounts = transaction.map(transaction => transaction.amountel);
    //ยอดเงินคงเหลือ
    const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);

    //รายรับ
    const income = amounts.filter(item => item > 0).reduce((result, item) => (result += item), 0).toFixed(2);

    //รายจ่าย
    const expenses = (amounts.filter(item => item < 0).reduce((result, item) => (result += item), 0) * -1).toFixed(2);

    //แสดงผลบนหน้าจอ
    balance.innerHTML = `฿${numberWithCommas(total)}`
    money_plus.innerHTML = `฿${numberWithCommas(income)}`
    money_minus.innerHTML = `฿${numberWithCommas(expenses)}`
} 

function removeData(id){
    transaction=transaction.filter(transaction=>transaction.id !==id);
    init();
}

function addTransection(e) {
    e.preventDefault();
    if(textel.value.trim() === '' || amountel.value.trim() ==='' ){
        alert(`โปรดใส่ข้อมูลให้ครบ`)
    }else{
        const data = {
            id: autoID(), 
            textel: textel.value, 
            amountel:+amountel.value
            
        }
        transaction.push(data);
        addDataToList(data)
        textel.value = ``;
        amountel.value = ``;
        init();

    }

}



formel.addEventListener('submit',addTransection)
init()
