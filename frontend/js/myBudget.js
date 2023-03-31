//const url = 'http://18.191.127.230:8080/finwise/services/'
const url = 'http://localhost:8080/finwise/services/'

//to change the theme
const savedTheme = localStorage.getItem('selected-theme');
document.documentElement.setAttribute("data-selected-theme", savedTheme);

if(sessionStorage.getItem("loggedIn") != "true"){
    window.location.href = "index.html";
}

obj1 = new Intl.NumberFormat('en-US');
const userId = sessionStorage.getItem('userId');

const monthControl = document.querySelector('#budgetMonth');
const monthControl2 = document.querySelector('#budgetMonth2');
const date= new Date()
const month=("0" + (date.getMonth() + 1)).slice(-2)
const year=date.getFullYear()
monthControl.value = `${year}-${month}`;
monthControl2.min = `${year}-${month}`;
monthControl2.value = `${year}-${month}`;
var changedMonth=month;
var changedYear=year;
var amountLeft = document.getElementsByClassName('amount-left')[0];
var spending = document.getElementsByClassName('spent-amount')[0];
var total = document.getElementsByClassName('total-amount')[0];
var spendingBar = document.getElementById('spending-bar');
var budgetList = document.getElementById('budget-list');

var loader = document.getElementById('loader');
var body = document.getElementById('container');


var successAlert = document.getElementsByClassName('my-alerts')[0];
var messageField = document.getElementsByClassName('message')[0];
function showAlert(message){
    successAlert.style.display = 'flex'
    successAlert.style.paddingTop = "2em";
    messageField.innerText = message;
    
}

function hideAlert(){
    successAlert.style.display = 'none'
}
function loading(){
    loader.style.display = "block";
    // body.style.display = "none";
    document.getElementsByTagName('body')[0].style.overflowY="hidden";
    body.style.overflowY = "hidden";
}

function loaded(){
    loader.style.display = "none";
    // body.style.display = "block";
    document.getElementsByTagName('body')[0].style.overflowY="scroll";
    body.style.overflowY = "scroll";
}

function openBudgetForm(){
    document.getElementById('add-budget-page').style.display='flex';
    document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
//   displayOption();
}

function closeBudgetForm(){
    document.getElementById('add-budget-page').style.display='none';
    document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}

function openCategoryForm(){
    document.getElementById('add-category-page').style.display='flex';
    document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}

function closeCategoryForm(){
    document.getElementById('add-category-page').style.display='none';
    document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}

function getAllbudget(){
    const form1 = document.getElementById('periodForm');
    const budgetInput = document.getElementById('budgetMonth');
    budgetInput.addEventListener('change',async (e)=>{
        // loading();
        // setTimeout(loaded,1000);
        e.preventDefault();
        
        // budgetList.removeChild();
        const formData = new FormData(form1);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(formData.entries());
        // Format the plain form data as JSON
        var period = formDataObject.budgetDate.split("-");
        var year = period[0];
        var month = period[1];
        changedMonth = period[1];
        changedYear = period[0];
        monthControl2.value = `${changedYear}-${changedMonth}`;
        delete formDataObject.budgetDate;
        formDataObject.month = month;
        formDataObject.year = year;
        displayOption(month,year);
        // console.log(formDataObject);
        let formDataJsonString = JSON.stringify(formDataObject);

        console.log(formDataJsonString);
        await fetch(url+`${userId}/budget/period`, {
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
            budgetList.innerHTML = `<button class="btn add-btn"  type="button" data-toggle="modal" data-target="#myModal"><img src="assets/add-icon.png" alt="add"> Budget</button>`;
            data.forEach((itemData) => {
                totalAmount += itemData.budgetAmount;
                spentAmount += itemData.spentAmount;
                // console.log(itemData);
                // console.log(totalAmount+" "+spentAmount);
                setEachCard(itemData);
            })
            remainingAmount = totalAmount - spentAmount;
            var percentage = (spentAmount / totalAmount) * 100;
            if(percentage >= 100){
                percentage = 100;
                spendingBar.style.borderRadius= "1em";
                spendingBar.style.backgroundColor = "orange"
            }
            amountLeft.innerHTML = `₹ ${obj1.format(remainingAmount)}`;
            spending.innerHTML = `${obj1.format(spentAmount)}`;
            total.innerHTML = `${obj1.format(totalAmount)}`;
            spendingBar.style.width = percentage+"%";
        // console.log(totalAmount+" "+spentAmount+" "+remainingAmount);
        })
        displayBudget(month,year);
        
    });
}

monthControl2.addEventListener('change',function(){
    var period = monthControl2.value.split("-");
    var year = period[0];
    var month = period[1];
    // console.log(period);
    displayOption(month,year);
})

document.addEventListener('DOMContentLoaded',async function() {
    var formDataObject = {};

    formDataObject.month = month;
        formDataObject.year = year;
        displayOption(month,year);
    let formDataJsonString = JSON.stringify(formDataObject);

        console.log(formDataJsonString);
        await fetch(url+`${userId}/budget/period`, {
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
                // console.log(itemData);
                // console.log(totalAmount+" "+spentAmount);
                setEachCard(itemData);
            })
            remainingAmount = totalAmount - spentAmount;
            var percentage = (spentAmount / totalAmount) * 100;
            if(percentage >=100){
                percentage = 100;
                spendingBar.style.borderRadius= "1em";
                spendingBar.style.backgroundColor = "orange"
            }
            amountLeft.innerHTML = `₹ ${obj1.format(remainingAmount)}`;
            spending.innerHTML = obj1.format(spentAmount);
            total.innerHTML = obj1.format(totalAmount);
            spendingBar.style.width = percentage+"%";
        console.log(totalAmount+" "+spentAmount+" "+remainingAmount);
        })
        displayBudget(month,year);
 }, false);


function setEachCard(budget){
    
    var budgetCard = document.createElement('div');
    budgetCard.classList.add('col-sm-5','col-xs-12','budget-card');
    var cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    var editButton =`<span class="material-symbols-rounded edit-button">
    edit
    </span>`;
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
        spendingBar.style.backgroundColor = "orange"
    }
    spendingBar.style.width = percentage+"%";
    spending.appendChild(spendingBar);
    cardHeader.appendChild(categoryName);
    cardHeader.insertAdjacentHTML('beforeend',editButton);
    budgetCard.appendChild(cardHeader);
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
    // console.log(budgetCard);
}

const batchTrack = document.getElementById("category");
var dtcategory = document.getElementById('dtcategory');
async function getCategories(year,month){
    var formDataObject = {};

    formDataObject.month = month;
    formDataObject.year = year;
    // console.log(month+" "+year);
    let formDataJsonString = JSON.stringify(formDataObject);

    // console.log(formDataJsonString);
    const response =await fetch(url+`${userId}/category/unused`, {
        method:'POST', 
          //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
          "Content-Type": "application/json",
            Accept: "application/json",
        },
        body:formDataJsonString
      });
//   console.log(response);
  const data = await response.json();
//   console.log(data);
  return data;
};

async function displayOption(month,year){
  const options =await getCategories(year,month);
  // options.forEach(option => {
    batchTrack.innerHTML=null;
    dtcategory.innerHTML = null;
    for(option of options){
        if(option != null){
            const newOption = document.createElement("option");
            // console.log(option);
            newOption.value = option.categoryId + " " + option.categoryName;
            newOption.text = option.categoryName;
            const newOption2 = document.createElement("option");
            // console.log(option);
            newOption2.value = option.categoryId + " " + option.categoryName;
            newOption2.text = option.categoryName;
            batchTrack.appendChild(newOption);
            dtcategory.appendChild(newOption2);
        }
    }

  // });
};

async function addBudget(){
    const budgetForm = document.getElementById('add-budget-form');
    budgetForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const budgetData = new FormData(budgetForm);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(budgetData.entries());
        var period = formDataObject.budgetDate.split("-");
        var year = period[0];
        var month = period[1];
        delete formDataObject.budgetDate;
        formDataObject.budgetMonth = month;
        formDataObject.budgetYear = year;
        console.log(formDataObject);
        formDataObject.isRecurring = "false";
        var categoryValue = formDataObject.category.split(" ");
        formDataObject.category = {categoryId:categoryValue[0],
            categoryName:categoryValue[1],userId:`${userId}`};
        console.log(formDataObject);
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);
        console.log(formDataJsonString);
        fetch(url+`${userId}/budget/create`, {
            method:'POST', 
            //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
            body: formDataJsonString
        }).then((response)=> response.json())
        .then((data)=>{
          if(data != null){
            console.log(data);
            // alert("Budget added")
            // getAllbudget();
            window.location.reload();
            closeBudgetForm();
            
          }else{
            alert("Not added ")
          }
        })
        displayBudget(month,year);
    });
}

function displayBudget(month,year){
    var editBtns = document.querySelectorAll('.edit-button');
    editBtns.forEach(btn=>
        {btn.onclick =async function(ev) {
            await displayOption(month,year);
            var index='';
            index = ev.target.parentElement.children[0].innerHTML;
            // console.log(index);
            $('#detailModal').modal('show');
            var formDataObject = {};
            var dtcategory = document.getElementById('dtcategory');
            var dtBudgetAmount = document.getElementById('dtbudgetAmount');
            formDataObject.month = month;
            formDataObject.year = year;
            // console.log(month+" "+year);
            let formDataJsonString = JSON.stringify(formDataObject);
            
            // console.log(formDataJsonString);
            // console.log(url+`${userId}/budget/details/${index}`);
            fetch(url+`${userId}/budget/details/${index}`, {
                method:'POST', 
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
                const newOption2 = document.createElement("option");
                // console.log(option);
                var id = document.getElementById('dtid');
                id.value=data.expenseBudgetId;
                newOption2.value = data.category.categoryId + " " + data.category.categoryName;
                newOption2.text = data.category.categoryName;
                dtcategory.appendChild(newOption2);
                dtcategory.value = data.category.categoryId + " " + data.category.categoryName;
                dtBudgetAmount.value = data.budgetAmount;
                // alert("Budget added")
                // getAllbudget();
                // window.location.reload();
                // closeBudgetForm();
                // deleteBudget()
              }else{
                alert("Not added ")
              }
            })
            

        }
    });
}

function deleteBudget(){
    var id = document.getElementById('dtid').value;
      console.log(id);
      fetch(url+`${userId}/budget/${id}`, {
              method:'DELETE', 
              //Set the headers that specify you're sending a JSON body request and accepting JSON response
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
          }
          }).then((response)=> response.json())
          .then((data)=>{
            if(data != null){
              // console.log(data);
              // alert("Transaction deleted");
              // closeDetailsForm();
              $('#detailModal').modal('hide');
              // getTransactions();
              window.location.reload();
            }
      })
  }

  
function updateBudget(){
    const budgetForm = document.getElementById('edit-budget-form');
    budgetForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const budgetData = new FormData(budgetForm);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(budgetData.entries());
        formDataObject.isRecurring = "false";
        var categoryValue = formDataObject.category.split(" ");
        formDataObject.category = {categoryId:categoryValue[0],
            categoryName:categoryValue[1],userId:`${userId}`};
        console.log(formDataObject);
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);
        console.log(formDataJsonString);
        fetch(url+`${userId}/budget/update`, {
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
            console.log(data);
            // alert("Budget added")
            // getAllbudget();
            $('#detailModal').modal('hide');
            window.location.reload();
            
            
          }else{
            alert("Not added ")
          }
        })
        // displayBudget(month,year);
    });
}

updateBudget();
getAllbudget();
// displayOption();
addBudget();
// addCategory();
// getCategories(year,month);
// displayBudget();