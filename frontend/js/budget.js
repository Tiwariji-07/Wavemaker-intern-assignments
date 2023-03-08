const monthControl = document.querySelector('#budgetMonth');
const date= new Date()
const month=("0" + (date.getMonth() + 1)).slice(-2)
const year=date.getFullYear()
monthControl.value = `${year}-${month}`;

var amountLeft = document.getElementsByClassName('amount-left')[0];
var spending = document.getElementsByClassName('spent-amount')[0];
var total = document.getElementsByClassName('total-amount')[0];
var spendingBar = document.getElementById('spending-bar');

// const getbudgets = async (formData) => {
//     const response =await fetch('http://localhost:8080/finwise/2/budget/period', {
//         method:'POST', 
//         //Set the headers that specify you're sending a JSON body request and accepting JSON response
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     },
//         body: formDataJsonString
//     });
//     console.log(response);
//     const data = await response.json();
//     return data;
// };


function getAllbudget(){
    const form1 = document.getElementById('periodForm');
    form1.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const formData = new FormData(form1);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(formData.entries());
        // Format the plain form data as JSON
        var period = formDataObject.budgetDate.split("-");
        var year = period[0];
        var month = period[1];
        delete formDataObject.budgetDate;
        formDataObject.month = month;
        formDataObject.year = year;
        console.log(formDataObject);
        let formDataJsonString = JSON.stringify(formDataObject);

        console.log(formDataJsonString);
        fetch('http://localhost:8080/finwise/2/budget/period', {
            method:'POST', 
            //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
            body: formDataJsonString
        }).then((response)=> response.json())
        .then((data)=>{
            var totalAmount=0;
            var spentAmount=0;
            var remainingAmount=0;
            data.forEach((itemData) => {
                totalAmount += itemData.budgetAmount;
                spentAmount += itemData.spentAmount;
                console.log(itemData);
                console.log(totalAmount+" "+spentAmount);
            })
            remainingAmount = totalAmount - spentAmount;
            var percentage = (spentAmount / totalAmount) * 100;
            if(percentage >100){
                percentage = 100;
                spendingBar.style.borderRadius= "1em";
            }
            amountLeft.innerHTML = remainingAmount;
            spending.innerHTML = spentAmount;
            total.innerHTML = totalAmount;
            spendingBar.style.width = percentage+"%";
        console.log(totalAmount+" "+spentAmount+" "+remainingAmount);
        })
        
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var formDataObject = {};
    formDataObject.month = month;
        formDataObject.year = year;
    let formDataJsonString = JSON.stringify(formDataObject);

        console.log(formDataJsonString);
        fetch('http://localhost:8080/finwise/2/budget/period', {
            method:'POST', 
            //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
            body: formDataJsonString
        }).then((response)=> response.json())
        .then((data)=>{
            var totalAmount=0;
            var spentAmount=0;
            var remainingAmount=0;
            data.forEach((itemData) => {
                totalAmount += itemData.budgetAmount;
                spentAmount += itemData.spentAmount;
                console.log(itemData);
                console.log(totalAmount+" "+spentAmount);
            })
            remainingAmount = totalAmount - spentAmount;
            var percentage = (spentAmount / totalAmount) * 100;
            if(percentage >100){
                percentage = 100;
                spendingBar.style.borderRadius= "1em";
            }
            amountLeft.innerHTML = remainingAmount;
            spending.innerHTML = spentAmount;
            total.innerHTML = totalAmount;
            spendingBar.style.width = percentage+"%";
        console.log(totalAmount+" "+spentAmount+" "+remainingAmount);
        })
 }, false);

getAllbudget();