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

fetch(`http://localhost:8080/finwise/${userId}/reminder`, {
    method:'GET', 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    }).then((response) => response.json())
    .then((data) => {
        var count = 0;
        
        data.forEach((itemData) => {
            console.log(itemData);
            count=count+1;
            if(count <= 4){
                temp += "<tr>";
                temp += "<td>" + count + "</td>";
                temp += "<td>" + itemData.billName + "</td>";
                temp += "<td>" + itemData.reminderDate + "</td>";
                temp += "<td>" + itemData.billAmount + "</td>";
                // temp+= "<td><button>Edit</button></td>";
                // temp+= "<td><button>Delete</button></td>";
                temp += "</tr>";
                // console.log(temp1);
            }
        });
        reminderData.innerHTML = temp;
})


async function getTransactions(){

    await fetch(`http://localhost:8080/finwise/${userId}/transactions`, {
        method:'GET', 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        }).then((response) => response.json())
        .then((data) => {
            var count = 0;
            var temp;
            data.forEach((itemData) => {
                // var category = getCategory(itemData.categoryId);
                count=count+1;
                console.log(itemData.category);
                if(count <= 4){
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
                    temp += "<td>" + itemData.debitAmount + "</td>";
                    temp += "<td>" + itemData.creditAmount + "</td>";
                    temp += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                    // temp+= "<td><button>Edit</button></td>";
                    // temp+= "<td><button>Delete</button></td>";
                    temp += "</tr>";
                }
                
            });
        document.getElementById('transaction-data').innerHTML = temp;
    })
}

function displayUser(){
    var duserId = document.getElementById('duserId');
    var dfirstName = document.getElementById('dfirstName');
    var dlastName = document.getElementById('dlastName');
    var demail = document.getElementById('demail');
    var dpassword = document.getElementById('dpassword');
    var doccupation = document.getElementById('doccupation');
    fetch(`http://localhost:8080/finwise/user/${userId}`).then((response)=> response.json())
    .then((data)=>{
    //   if(data != null){
    //     console.log(data);
    //     // alert("transaction added")
    //     getTransactions();
    //   }else{
    //     // alert("Not added ")
    //   }
        console.log(data);
        duserId.value = data.userId;
        dfirstName.value = data.firstName;
        dlastName.value = data.lastName;
        demail.value = data.email;
        doccupation.value = data.occupation;
        dpassword.value = data.password;
        if(data.gender === 'male'){
            // console.log(data.isRecurring);
            document.getElementById('dinlineRadio1').click();
        }else if(data.gender === 'female'){
            // console.log(data.isRecurring);
            document.getElementById('dinlineRadio2').click();
        }else{
            document.getElementById('dinlineRadio3').click();
        }
    });
    // console.log(response);
    // const data = response.json();
    // return data;

}

function logout(){
    sessionStorage.setItem('userId',0);
    sessionStorage.setItem('loggedIn','false')
    window.location.href = "index.html";
}

function updateUser(){
    const form1 = document.getElementById('user-detail-form');
    form1.addEventListener('submit', (e)=>{
        e.preventDefault();

        const formData = new FormData(form1);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(formData.entries());
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);

        // console.log(formDataJsonString);
        fetch('http://localhost:8080/finwise/user/update', {
            method:'PUT', 
            //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
            body: formDataJsonString
        }).then((response)=> response.json())
        .then((data)=>{
        if(data != null){
            // console.log(data);
            alert("Details updated")
            closeUserDetailsForm();
        }else{
            alert("Error updating.")
        }
        })
    });
}

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
            amountLeft.innerHTML = remainingAmount;
            spending.innerHTML = spentAmount;
            total.innerHTML = totalAmount;
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
                        Spent
                        <span class="card-spent-amount">${spentAmount}</span>
                        of
                        <span class="card-total-amount">${totalAmount}</span>
                    </div>`
    budgetCard.insertAdjacentHTML('beforeend',barFooter);
    budgetList.appendChild(budgetCard);
    console.log(budgetCard);
}

updateUser();

getTransactions();