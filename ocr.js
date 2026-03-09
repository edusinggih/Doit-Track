// =======================
// MONEYTRACK OCR MODULE
// =======================

// load OCR dari Tesseract
async function readReceipt(imageFile){

const { createWorker } = Tesseract

const worker = await createWorker()

await worker.loadLanguage("eng")
await worker.initialize("eng")

const { data } = await worker.recognize(imageFile)

await worker.terminate()

const text = data.text

console.log("OCR RESULT:")
console.log(text)

const amount = extractTotal(text)

return {

text,
amount

}

}

// ambil angka total dari teks
function extractTotal(text){

const lines = text.split("\n")

let total = 0

lines.forEach(line => {

const match = line.match(/[0-9]+[.,]?[0-9]*/g)

if(match){

match.forEach(num => {

const clean = parseInt(num.replace(/[.,]/g,""))

if(clean > total)
total = clean

})

}

})

return total

}

// proses upload foto
async function processReceipt(input){

const file = input.files[0]

if(!file)
return

const result = await readReceipt(file)

alert("Total terdeteksi: Rp " + result.amount.toLocaleString("id-ID"))

document.getElementById("amount").value = result.amount

}