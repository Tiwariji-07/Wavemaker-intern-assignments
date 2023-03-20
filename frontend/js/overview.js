if(sessionStorage.getItem("loggedIn") != "true"){
    window.location.href = "index.html";
}

const userId = sessionStorage.getItem('userId');

console.log(sessionStorage.getItem("userId"));

function openUserDetailsForm() {
    document.getElementById("user-detail-page").style.display = "flex";
    document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
    displayUser();
}
    
function closeUserDetailsForm() {
    document.getElementById("user-detail-page").style.display = "none";
    document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}

var reminderData = document.getElementById('reminder-data');

var temp;
var budgetList = document.getElementById('budget-list');

const date= new Date()
const month=("0" + (date.getMonth() + 1)).slice(-2)
const year=date.getFullYear();

var amountLeft = document.getElementsByClassName('amount-left')[0];
var spending = document.getElementsByClassName('spent-amount')[0];
var total = document.getElementsByClassName('total-amount')[0];
var spendingBar = document.getElementById('spending-bar');


obj1 = new Intl.NumberFormat('en-US');  //number formater in commas
// to format the date
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
var activeDates = [];
async function showReminders(currMonth,currYear){
    var formDataObject = {};
    var flag = true;
    formDataObject.month = currMonth;
    formDataObject.year = currYear;
    console.log(formDataObject);
    let formDataJsonString = JSON.stringify(formDataObject);
    await fetch(`http://localhost:8080/finwise/${userId}/reminder/period`, {
    method:'POST', 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: formDataJsonString
    }).then((response) => response.json())
    .then((data) => {
        var count = 0;
        
        console.log(data.length);
        // clg
        if(data.length !=0){
            var temp="";
            data.forEach((itemData) => {
                console.log(itemData);
                count=count+1;
                var recurringDate;
                var rd;
                
                // if(itemData.isRecurring){
                //     var d = new Date(formatDate(itemData.reminderDate)).getDate();
                //     console.log(d);
                //     var r = new Date(formatDate(itemData.reminderDate)).setMonth(currMonth-1);
                //     var d1 = new Date(r).getDate();
                //     console.log(d1);
                //     if(d <= d1 ){
                //      recurringDate = new Date(formatDate(itemData.reminderDate)).setMonth(currMonth-1);
                //      rd = new Date(recurringDate).toDateString();
                //     //  recurringDate.toLocaleString();
                //     // console.log(rd);
                //     }else{
                //         return;
                //     }
                // }else{
                    rd = itemData.reminderDate;
                // // }
                // temp += "<tr>";
                // temp += "<td>" + count + "</td>";
                // temp += "<td>" + itemData.billId + "</td>";
                // temp += "<td>" + itemData.billName + "</td>";
                // temp += "<td>" + rd + "</td>";
                // temp += "<td>₹ " + itemData.billAmount + "</td>";
                // // temp+= "<td><button>Edit</button></td>";
                // // temp+= "<td><button>Delete</button></td>";
                // temp += "</tr>";
                activeDates.push([itemData.billName,itemData.billAmount,formatDate(rd)]);
            });
            // document.getElementById('data').innerHTML = temp;
        }else{
            // flag=false;
            // var temp="";
            // // temp = `<img src="assets/no-result-found.svg" class="img img-responsive result-img"/>`
            // temp += `No Reminders`;
            // document.getElementsByClassName('r-jumbotron')[0].innerHTML = temp;
        }
        
        // calender();
        // if(flag){
            // document.getElementById('data').innerHTML = temp;
        // }else{
        //     document.getElementsByClassName('r-jumbotron')[0].innerHTML = temp;
        // }
    })
    
    
}


var income = 0;
var expense = 0;
var savings = 0;
var accountIncome = document.getElementById('acc-income');
var accountExpense = document.getElementById('acc-expense');
var accountBalance = document.getElementById('balance');
var expenseChartData = {};
async function getTransactions(){
    var formDataObject = {};

    formDataObject.month = month;
        formDataObject.year = year;
    let formDataJsonString = JSON.stringify(formDataObject);
    await fetch(`http://localhost:8080/finwise/${userId}/transactions/period`, {
        method:'POST', 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: formDataJsonString
        }).then((response) => response.json())
        .then((data) => {
            var count = 0;
            var temp="";
            if(data.length != 0){
                data.forEach((itemData) => {
                    // var category = getCategory(itemData.categoryId);
                    income += itemData.creditAmount;
                    expense += itemData.debitAmount;
                    count=count+1;
                    if("category" in itemData){
                        // var catName = itemData.category.categoryName;
                        if(itemData.category.categoryName in expenseChartData){
                            var amount = expenseChartData[itemData.category.categoryName];
                            expenseChartData[itemData.category.categoryName] = amount + itemData.debitAmount;
                        }else{
                            expenseChartData[itemData.category.categoryName] = 0;
                            var amount = expenseChartData[itemData.category.categoryName];
                            expenseChartData[itemData.category.categoryName] = amount + itemData.debitAmount;
                        }
                        // expenseChartData[itemData.category.categoryName]+=itemData.debitAmount;
                    }
                    console.log(expenseChartData);
                    // console.log(itemData.category);
                    if(count <= 8){
                        temp += "<tr>";
                        temp += "<td>" + count + "</td>";
                        temp += "<td>" + itemData.transactionType.transactionTypeName + "</td>";
                        // var category = itemData.category;
                        if(!("category" in itemData)){
                            console.log(itemData);
                            temp += "<td>" + "-" + "</td>";
                        }else{
                            temp += "<td>" + itemData.category.categoryName + "</td>";
                        }
                        temp += "<td>" + obj1.format(itemData.debitAmount) + "</td>";
                        temp += "<td>" + obj1.format(itemData.creditAmount) + "</td>";
                        temp += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                        // temp+= "<td><button>Edit</button></td>";
                        // temp+= "<td><button>Delete</button></td>";
                        temp += "</tr>";
                    }
                    
                });
            }else{
                temp = `<tr>No data</tr>`;
            }
        savings = income - expense;
        var incomeData= `<h6>Total Income</h6>
        <span>${obj1.format(income)}</span>`;
        var expenseData =`<h6>Total Expense</h6>
        <span>${obj1.format(expense)}</span>`;
        var balanceData =`<h6>Savings</h6>
        <span>${obj1.format(savings)}</span>`;
        accountExpense.innerHTML = expenseData;
        accountIncome.innerHTML = incomeData;
        accountBalance.innerHTML = balanceData;
        document.getElementById('transaction-data').innerHTML = temp;
    })
}

// function displayUser(){
//     var duserId = document.getElementById('duserId');
//     var dfirstName = document.getElementById('dfirstName');
//     var dlastName = document.getElementById('dlastName');
//     var demail = document.getElementById('demail');
//     var dpassword = document.getElementById('dpassword');
//     var doccupation = document.getElementById('doccupation');
//     fetch(`http://localhost:8080/finwise/user/${userId}`).then((response)=> response.json())
//     .then((data)=>{
//     //   if(data != null){
//     //     console.log(data);
//     //     // alert("transaction added")
//     //     getTransactions();
//     //   }else{
//     //     // alert("Not added ")
//     //   }
//         console.log(data);
//         duserId.value = data.userId;
//         dfirstName.value = data.firstName;
//         dlastName.value = data.lastName;
//         demail.value = data.email;
//         doccupation.value = data.occupation;
//         dpassword.value = data.password;
//         if(data.gender === 'male'){
//             // console.log(data.isRecurring);
//             document.getElementById('dinlineRadio1').click();
//         }else if(data.gender === 'female'){
//             // console.log(data.isRecurring);
//             document.getElementById('dinlineRadio2').click();
//         }else{
//             document.getElementById('dinlineRadio3').click();
//         }
//     });
//     // console.log(response);
//     // const data = response.json();
//     // return data;

// }

// function logout(){
//     sessionStorage.setItem('userId',0);
//     sessionStorage.setItem('loggedIn','false')
//     window.location.href = "index.html";
// }

// function updateUser(){
//     const form1 = document.getElementById('user-detail-form');
//     form1.addEventListener('submit', (e)=>{
//         e.preventDefault();

//         const formData = new FormData(form1);
//         // const data = new URLSearchParams(formData);
//         //Create an object from the form data entries
//         let formDataObject = Object.fromEntries(formData.entries());
//         // Format the plain form data as JSON
//         let formDataJsonString = JSON.stringify(formDataObject);

//         // console.log(formDataJsonString);
//         fetch('http://localhost:8080/finwise/user/update', {
//             method:'PUT', 
//             //Set the headers that specify you're sending a JSON body request and accepting JSON response
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//             body: formDataJsonString
//         }).then((response)=> response.json())
//         .then((data)=>{
//         if(data != null){
//             // console.log(data);
//             alert("Details updated")
//             closeUserDetailsForm();
//         }else{
//             alert("Error updating.")
//         }
//         })
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    var formDataObject = {};
    formDataObject.month = month;
        formDataObject.year = year;
    let formDataJsonString = JSON.stringify(formDataObject);

        console.log(formDataJsonString);
        fetch(`http://localhost:8080/finwise/${userId}/budget/period`, {
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
                setEachCard(itemData);
            })
            remainingAmount = totalAmount - spentAmount;
            var percentage = (spentAmount / totalAmount) * 100;
            if(percentage >100){
                percentage = 100;
                spendingBar.style.borderRadius= "1em";
            }
            amountLeft.innerHTML = `₹ ${remainingAmount} left`;
            spending.innerHTML = obj1.format(spentAmount);
            total.innerHTML = obj1.format(totalAmount);
            spendingBar.style.width = percentage+"%";
        console.log(totalAmount+" "+spentAmount+" "+remainingAmount);
        })
 }, false);

 function setEachCard(budget){
    
    var budgetCard = document.createElement('div');
    budgetCard.classList.add('col-sm-5','col-xs-12','budget-card');
    var categoryName = document.createElement('h4');
    var spending = document.createElement('div');
    spending.classList.add('spending-c');
    var spendingBar = document.createElement('div');
    spendingBar.classList.add('spending-bar-c');
    // var cardBarFooter = document.createElement('div');
    // cardBarFooter.classList.add('bar-footer');
    // var cardSpentAmount = document.createElement('span');
    // cardSpentAmount.classList.add('spent-amount');
    // var cardTotalAmount = document.createElement('span');
    // cardTotalAmount.classList.add('total-amount');
    

    var spentAmount=0;
    var remainingAmount=0;
    var totalAmount=0;
    categoryName.innerHTML = budget.category.categoryName;
    spentAmount=budget.spentAmount;
    totalAmount = budget.budgetAmount;
    // cardSpentAmount.innerText = spentAmount;
    // cardTotalAmount.innerText = totalAmount;
    var percentage = (spentAmount / totalAmount) * 100;
    if(percentage >=100){
        percentage = 100;
        spendingBar.style.borderRadius= "1em";
    }
    spendingBar.style.width = percentage+"%";
    spending.appendChild(spendingBar);
    budgetCard.appendChild(categoryName);
    budgetCard.appendChild(spending);
    // // cardBarFooter.appendChild('spent');
    // cardBarFooter.appendChild(cardSpentAmount);
    // // cardBarFooter.appendChild('of');
    // cardBarFooter.appendChild(cardTotalAmount);
    // budgetCard.appendChild(cardBarFooter);
    var barFooter = `<div class="card-bar-footer">
                        Spent ₹
                        <span class="card-spent-amount">${obj1.format(spentAmount)}</span>
                        of ₹
                        <span class="card-total-amount">${obj1.format(totalAmount)}</span>
                    </div>`
    budgetCard.insertAdjacentHTML('beforeend',barFooter);
    budgetList.appendChild(budgetCard);
    console.log(budgetCard);
}


async function displayTranByCategoryChart(){
    await getTransactions();
    const ctx = document.getElementById('chartContainer');
    var categories = Object.keys(expenseChartData);
    console.log(categories);
    var dataSet = [];
    var dataSet1 = [];
    categories.forEach((category)=>{
        dataSet.push({data:expenseChartData[category],label:category,borderWidth: 1});
        dataSet1.push(expenseChartData[category]);
    });
    console.log(dataSet);
    // var chart = new CanvasJS.Chart("chartContainer", {
    //     animationEnabled: true,
    //     title:{
    //         text: "Expense By Category",
    //         horizontalAlign: "left"
    //     },
    //     data: [{
    //         type: "doughnut",
    //         startAngle: 60,
    //         //innerRadius: 60,
    //         indexLabelFontSize: 17,
    //         indexLabel: "{label} - #percent%",
    //         toolTipContent: "<b>{label}:</b> {y} (#percent%)",
    //         dataPoints: dataSet
    //     }]
    // });
    // chart.render();
    new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: categories,
          datasets: [{
            label: 'Expense',
            data: dataSet1,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}

// updateUser();
// function calender(){
    const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
    // getting new date, current year and month
    let dateNew = new Date(),
    currYear = dateNew.getFullYear(),
    currMonth = dateNew.getMonth();
    // storing full name of all months in array
    const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
    const renderCalendar =async () => {
        await showReminders(currMonth+1,currYear);
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        let liTag = "";
        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }
        for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched
            let isToday ="";
            var props = "";
            // if(i === new Date().getDate() && currMonth === new Date().getMonth() 
            //     && currYear === new Date().getFullYear()){
            //         isToday = "present"
            //         props = "";
            //     }
            activeDates.forEach((bill)=>{
                var date1 = new Date(bill[2]);
                // console.log(date1);
                if(i === date1.getDate() && currMonth === date1.getMonth()
                        && currYear === date1.getFullYear()){
                            isToday = "active";
                            props = `data-trigger="hover" data-toggle="popover" title="Bill Name: ${bill[0]}\n\nAmount: ₹${bill[1]}" data-content="${bill[1]}"`
                }
            });
            if(i === new Date().getDate() && currMonth === new Date().getMonth() 
                && currYear === new Date().getFullYear()){
                    isToday = "present"
                    // props = "";
                }
            
            
            console.log(props);
            liTag += `<li class="${isToday}" ${props}>${i}</li>`;
        }
        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        }
        // for(let i )
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        daysTag.innerHTML = liTag;
    }
    renderCalendar();
    prevNextIcon.forEach(icon => { // getting prev and next icons
        icon.addEventListener("click", () => { // adding click event on both icons
            // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
            if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
                // creating a new date of current year & month and pass it as date value
                dateNew = new Date(currYear, currMonth, new Date().getDate());
                currYear = dateNew.getFullYear(); // updating current year with new date year
                currMonth = dateNew.getMonth(); // updating current month with new date month
            } else {
                dateNew = new Date(); // pass the current date as date value
            }
            renderCalendar(); // calling renderCalendar function
            
        });
    });
// }

displayTranByCategoryChart();