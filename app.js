// =========================
// MONEYTRACK APP.JS
// =========================

// load transaksi
function getTransactions() {

return JSON.parse(
localStorage.getItem("moneytrack_transactions") || "[]"
)

}

// simpan transaksi
function saveTransactions(data){

localStorage.setItem(
"moneytrack_transactions",
JSON.stringify(data)
)

}

// tambah transaksi
function addTransaction(data){

const transactions = getTransactions()

transactions.push(data)

saveTransactions(transactions)

}

// hapus transaksi
function deleteTransaction(id){

let transactions = getTransactions()

transactions = transactions.filter(t => t.id !== id)

saveTransactions(transactions)

}

// hitung total
function calculateSummary(){

const transactions = getTransactions()

let income = 0
let expense = 0

transactions.forEach(t => {

if(t.type === "income")
income += t.amount

if(t.type === "expense")
expense += t.amount

})

return {

income,
expense,
balance: income - expense

}

}

// format rupiah
function rupiah(number){

return "Rp " + number.toLocaleString("id-ID")

}

// export data json
function exportData(){

const data = getTransactions()

const blob = new Blob(
[JSON.stringify(data,null,2)],
{type:"application/json"}
)

const url = URL.createObjectURL(blob)

const a = document.createElement("a")

a.href = url
a.download = "moneytrack-backup.json"

a.click()

}

// import data
function importData(file){

const reader = new FileReader()

reader.onload = function(e){

const data = JSON.parse(e.target.result)

saveTransactions(data)

alert("Import berhasil")

location.reload()

}

reader.readAsText(file)

}