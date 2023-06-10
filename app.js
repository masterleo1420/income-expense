const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const listel = document.getElementById('list');
const formel = document.getElementById('form');
const textel = document.getElementById('text');
const amountel = document.getElementById('aomunt');

const historyTransaction = [
    { id: 1, textel: "ค่าขนม", amountel: -300 },
    { id: 2, textel: "ซื้อกล้อง", amountel: 2000 },
    { id: 3, textel: "ได้เงินค่าขนม", amountel: 2000 },
    { id: 4, textel: "ได้เงินค่าขนม", amountel: -2000 }
]
const transaction = historyTransaction;

function init() {
    transaction.forEach(addDataToList);
    calculateMoney();
}
function addDataToList(transaction) {

    const symbol = transaction.amountel < 0 ? "-" : "+";

    const status = transaction.amountel < 0 ? "minus" : "plus";

    const item = document.createElement('li')

    item.innerHTML = `${transaction.textel} <sapn> ${symbol}${Math.abs(transaction.amountel)} </span><button class = "delete-btn">X</button>`
    item.classList.add(status)
    listel.appendChild(item)
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
    balance.innerHTML = `฿${total}`
    money_plus.innerHTML = `฿${income}`
    money_minus.innerHTML = `฿${expenses}`
    
} 


init()
