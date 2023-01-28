const Bill = document.querySelector(".bill");
const customTipInput = document.querySelector(".custom-Tip")
const numberOfPeopleInput = document.querySelector(".number-of-people");
const tipAmountPP = document.getElementById('Tip-Amount');
const totalPP = document.getElementById('Total');
const selectTipBtns = document.querySelectorAll(".btn-primary");
const resetToggle =document.querySelector('.reset');
const error = document.querySelector(".error");


Bill.value = "0.0";
numberOfPeopleInput.value = "1";
tipAmountPP.innerHTML = "$" + (0.0).toFixed(2);
totalPP.innerHTML = "$" + (0.0).toFixed(2);


let billValue = 0.0;
let numberofpeopleValue = 1;
let tipValue = 0.15;


function billInput() {
    billValue = parseFloat(Bill.value);
    calculateTip();
}
  
function tipInput() {
    tipValue = parseFloat(customTipInput.value / 100);
  
    selectTipBtns.forEach(function (val) {
      val.classList.remove("active-tip");
    });
    calculateTip();
}

function peopleInput(){

    numberofpeopleValue = parseFloat(numberOfPeopleInput.value);

    if (numberofpeopleValue < 1) {
        error.style.display = "flex";
        numberOfPeopleInput.style.border = "2px solid red";
    } else {
        error.style.display = "none";
        numberOfPeopleInput.style.border = "none";
        calculateTip();
    }
}

Bill.addEventListener("input", billInput);

numberOfPeopleInput.addEventListener("input", peopleInput);

customTipInput.addEventListener("input", tipInput);


selectTipBtns.forEach( item => {
    item.addEventListener("click", (event) => {
        selectTipBtns.forEach( function (val) {
            val.classList.remove("active-tip");
            if (event.target.innerHTML == val.innerHTML) {
            val.classList.add("active-tip");
            tipValue = parseFloat(val.innerHTML) / 100;
            }
        });
        calculateTip();
    });
});

function calculateTip() {
    if (numberofpeopleValue >= 1) {
      let tipAmount = (billValue * tipValue) / numberofpeopleValue;
      let total = (billValue + tipAmount) / numberofpeopleValue;
      tipAmountPP.innerHTML = "$" + tipAmount.toFixed(2);
      totalPP.innerHTML = "$" + total.toFixed(2);
    }
}


resetToggle.addEventListener("click", () =>{

    Bill.value = "0.0";
    billInput();
    numberOfPeopleInput.value = "1";
    peopleInput();
    customTipInput.value = "";
      
});


const isNumber = (value) => {
    // Allow Exceptions
    if (
      value === "Backspace" ||
      value === "ArrowLeft" ||
      value === "ArrowRight" ||
      value === "."
    ) {
      return true;
    }
  
    const regex = /^[0-9]+$/;
  
    return regex.test(value);
};

// Prevent alphabetical characters from being entered
Bill.addEventListener("keydown", (event) => {
    if (!isNumber(event.key)) {
      event.preventDefault();
    }
  });
customTipInput.addEventListener("keydown", (event) => {
    if (!isNumber(event.key)) {
      event.preventDefault();
    }
  });
numberOfPeopleInput.addEventListener("keydown", (event) => {
    if (!isNumber(event.key)) {
      event.preventDefault();
    }
  });


