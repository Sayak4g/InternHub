const addTransactionBtn = document.getElementById('addTransactionBtn');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categorySelect = document.getElementById('category');
const balanceDisplay = document.getElementById('balance');
const transactionList = document.getElementById('transactionList');

let balance = 0;
let transactions = [];

addTransactionBtn.addEventListener('click', function () {
    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categorySelect.value;

    if (isNaN(amount) || description === '') {
        alert('Please enter a valid amount and description.');
        return;
    }

    const transaction = {
        amount,
        description,
        category,
        date: new Date().toLocaleString()
    };

    transactions.push(transaction);

    if (category === 'income') {
        balance += amount;
    } else if (category === 'expense') {
        balance -= amount;
    }

    updateBalance();
    displayTransaction(transaction);

    amountInput.value = '';
    descriptionInput.value = '';
    categorySelect.value = 'income';
});

function updateBalance() {
    balanceDisplay.textContent = `₹${balance.toFixed(2)}`;
}

function displayTransaction(transaction) {
    const transactionElement = document.createElement('li');
    transactionElement.classList.add(transaction.category);

    transactionElement.innerHTML = `
        <span>${transaction.description} - ₹${transaction.amount.toFixed(2)}</span>
        <span>${transaction.date}</span>
    `;

    transactionList.appendChild(transactionElement);
}
