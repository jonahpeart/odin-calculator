const buttons = document.querySelectorAll(".button")
const display = document.querySelector("#screen-inner")

console.log(buttons)
console.log(display)

let firstNum = null
let secondNum = null
let firstOp = null
let secondOp = null
let operatorInfo = null
let result = null
let currentDisplay = null


const pressed = () => {
    
    buttons.forEach(a =>{
        a.addEventListener("mousedown", ()=>{   

            a.classList.add('active');

            if (a.id == "clear") {
                display.innerHTML = ""
                firstNum = secondNum = firstOp = null
            } 
            else if (a.classList[1] == "operand" && firstNum != null && secondNum == null) {
                firstOp = a.childNodes[0].data
                operatorInfo = a
                currentDisplay = firstOp
                show()
            }
            else if (a.classList[1]=="negative" && firstNum == null && secondNum == null) {
                firstNum = "-"
                currentDisplay = firstNum
                show()
            }
            else if (a.classList[1]=="num" && firstNum == null && secondNum == null) {
                firstNum = a.childNodes[0].data
                currentDisplay = firstNum
                show()
            }
            else if (a.classList[1]=="num" && firstNum != null && firstOp == null) {                    
                firstNum = firstNum + a.childNodes[0].data
                if (firstNum.length >12){
                currentDisplay = firstNum.substring(0,12)
                } else {
                    currentDisplay = firstNum
                }
                show()
            } 
            else if (a.classList[1] == "decimal" && firstOp == null){
                if (firstNum==null){
                    firstNum = a.childNodes[0].data
                } else if (firstNum.includes(".")==false){
                firstNum = firstNum + a.childNodes[0].data
                }
                currentDisplay = firstNum
                show()
            }
            else if (a.classList[1]=="negative" && firstNum != null && secondNum == null) {
                secondNum = "-"
                currentDisplay = secondNum
                show()
            }
            else if (firstOp != null && firstNum != null && secondNum == null){
                secondNum = a.childNodes[0].data                    
                currentDisplay = secondNum
                show()
            }
            else if (a.classList[1]=="num" && firstNum != null && secondNum != null) {
                secondNum = secondNum + a.childNodes[0].data
                if (secondNum.length >12){
                    currentDisplay = secondNum.substring(0,12)
                    } else {
                        currentDisplay = secondNum
                    }
                    show()
            }
            else if (a.classList[1] == "decimal" && firstOp != null){
                if (secondNum == null){
                    secondNum = a.childNodes[0].data
                } else if (secondNum.includes(".")==false){
                secondNum = secondNum + a.childNodes[0].data
                }
                currentDisplay = secondNum
                show()
            }
            else if (a.classList[1] == "operand" && firstNum != null && secondNum != null) {
                firstNum = operate()
                show()
                console.log(`first number : ${firstNum}, first operand : ${firstOp}, second number : ${secondNum}`)  
                secondNum = null   
                firstOp = null   
                }

                a.addEventListener("mouseup",()=>{a.classList.remove('active')})
            }
        )
    })
}

const show = () =>{
    display.innerHTML = ""
    display.insertAdjacentHTML('beforeend', currentDisplay);
}

const operate = () =>{
    firstNum = Number(firstNum)
    secondNum = Number(secondNum)

    if (operatorInfo.id == "divide"){
        result = firstNum / secondNum
    }
    else if (operatorInfo.id == "multiply") {
        result = firstNum * secondNum
    }
    else if (operatorInfo.id == "subtract") {
        result = firstNum - secondNum
    }
    else if (operatorInfo.id == "add") {
        result = firstNum + secondNum
    }
    else if (operatorInfo.id == "equals"){
        result = secondNum
        
    }

let resultNoDecimal = result.toFixed(0)
let resultString = result.toString()

if (resultString.includes(".")==true){
    if (resultString.length > 10){
    let n = 12 - resultNoDecimal.toString().length
    currentDisplay = `${result.toFixed(n)}...`
    
    } else if (resultString.length <= 10){
        currentDisplay = result
        
    }
} else if (resultString.includes(".")==false) {
    if (resultString.length >= 10){
    currentDisplay = `${resultString.substring(0,10)}...`
    } else {
        currentDisplay = result
    }
}
show()
return result
}

pressed()