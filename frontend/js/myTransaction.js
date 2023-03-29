
//const url = 'http://18.191.127.230:8080/finwise/services/'
const url = 'http://localhost:8080/finwise/services/'

//to change the theme
const savedTheme = localStorage.getItem('selected-theme');
document.documentElement.setAttribute("data-selected-theme", savedTheme);


if(sessionStorage.getItem("loggedIn") != "true"){
  window.location.href = "index.html";
}

const userId = sessionStorage.getItem('userId');

const monthControl = document.querySelector('#budgetMonth');
var rDate = document.getElementById('date');

var rDate1 = document.getElementById('date1');

const date= new Date()
const month=("0" + (date.getMonth() + 1)).slice(-2)
const year=date.getFullYear()

monthControl.value = `${year}-${month}`;
rDate.min = `${year}-${month}`;
rDate1.min = `${year}-${month}`;

var loader = document.getElementById('loader');
// var body = document.getElementById('container');

function loading(){
    loader.style.display = "block";
    // body.style.display = "none";
    document.getElementsByTagName('body')[0].style.overflowY="hidden";
    // body.style.overflowY = "hidden";
}

function loaded(){
    loader.style.display = "none";
    // body.style.display = "block";
    document.getElementsByTagName('body')[0].style.overflowY="scroll";
    // body.style.overflowY = "scroll";
}

function openTranForm() {
  document.getElementById("transaction-income-page").style.display = "flex";
  document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}

function closeTranForm() {
  document.getElementById("transaction-income-page").style.display = "none";
  document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}

function openTranExpenseForm() {
  document.getElementById("transaction-expense-page").style.display = "flex";
  document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}

function closeTranExpenseForm() {
  document.getElementById("transaction-expense-page").style.display = "none";
  document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}

function openDetailsForm() {
  document.getElementById("expenseDetailForm").style.display = "flex";
  document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}
  
function closeDetailsForm() {
  document.getElementById("expenseDetailForm").style.display = "none";
  document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}
function openDetails1Form() {
  document.getElementById("incomeDetailForm").style.display = "flex";
  document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}
  
function closeDetails1Form() {
  document.getElementById("incomeDetailForm").style.display = "none";
  document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}
function getTransactions(){
  const form1 = document.getElementById('periodForm');
  const budgetMonth = document.getElementById('budgetMonth');
    budgetMonth.addEventListener('change',async (e)=>{

      
      loading();
        setTimeout(loaded,1000);
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
        rDate.value = `${year}-${month}`;
      rDate1.value = `${year}-${month}`;
        delete formDataObject.budgetDate;
        formDataObject.month = month;
        formDataObject.year = year;
        // console.log(formDataObject);
        let formDataJsonString = JSON.stringify(formDataObject);

      await fetch(url+`${userId}/transactions/period`, {
      method:'POST', 
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: formDataJsonString
      }).then((response) => response.json())
      .then((data) => {
        var count = 0;
        var count1 = 0;
        var temp="";
        var temp1="";
        if(data.length != 0 ){
          data.forEach((itemData) => {
              // var category = getCategory(itemData.categoryId);
              var tranType = itemData.transactionType.transactionTypeName;
              if(tranType === "expense"){
                count=count+1;
                // console.log(itemData.category);
                temp += "<tr>";
                // temp += "<td>" + count + "</td>";
                temp += `<td class="tid">` + itemData.transactionId + "</td>";
                // temp += "<td>" + itemData.transactionType.transactionTypeName + "</td>";
                // var category = itemData.category;
                // if(!("category" in itemData)){
                //     console.log(itemData);
                //     temp += "<td>" + "-" + "</td>";
                // }else{
                    temp += "<td>" + itemData.category.categoryName + "</td>";
                // }
                temp += "<td>₹ " + itemData.debitAmount + "</td>";
                // temp += "<td>" + itemData.creditAmount + "</td>";
                temp += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                temp+= `<td><span class="material-symbols-rounded edit-button">
                edit
                </span></td>`;
                temp+= `<td><span class="material-symbols-rounded delete-button">
                delete
                </span></td>`
                // temp+= `<td><img src="assets/edit-icon.png" alt="" class="img img-responsive edit-img"></td>`;
                // temp+= "<td><button>Delete</button></td>";
                temp += "</tr>";
              }else{
                count1=count1+1;
                // console.log(itemData.category);
                temp1 += "<tr>";
                // temp1 += "<td>" + count1 + "</td>";
                temp1 += `<td class="tid">` + itemData.transactionId + "</td>";
                // temp1 += "<td>" + itemData.transactionType.transactionTypeName + "</td>";
                // var category = itemData.category;
                // if(!("category" in itemData)){
                //     console.log(itemData);
                //     temp1 += "<td>" + "-" + "</td>";
                // }else{
                    temp1 += "<td>" + itemData.category.categoryName + "</td>";
                // }
                // temp1 += "<td>" + itemData.debitAmount + "</td>";
                temp1 += "<td>₹ " + itemData.creditAmount + "</td>";
                temp1 += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                temp1+= `<td><span class="material-symbols-rounded edit-button1">
                edit
                </span></td>`;
                temp1+= `<td><span class="material-symbols-rounded delete-button1">
                delete
                </span></td>`
                // temp1+= `<td><button><img src="assets/edit-icon.png" alt="edit" class="img img-responsive edit-img"></button></td>`;
                // temp1+= "<td><button>Delete</button></td>";
                temp1 += "</tr>";
              }


              
              
          });
      }else{
        temp = `<tr>No data</tr>`;
        temp1 = `<tr>No data</tr>`;
      }
        document.getElementById('data').innerHTML = temp;
        document.getElementById('data1').innerHTML = temp1;
    })
    });
    displayTransaction();
}

document.addEventListener('DOMContentLoaded',async function() {
  var formDataObject = {};

  formDataObject.month = month;
      formDataObject.year = year;
      rDate.value = `${year}-${month}`;
      rDate1.value = `${year}-${month}`;
  let formDataJsonString = JSON.stringify(formDataObject);
  await fetch(url+`${userId}/transactions/period`, {
      method:'POST', 
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: formDataJsonString
      }).then((response) => response.json())
      .then((data) => {
          var count = 0;
          var count1 = 0;
          var temp="";
          var temp1="";
          if(data.length != 0 ){
            data.forEach((itemData) => {
                // var category = getCategory(itemData.categoryId);
                var tranType = itemData.transactionType.transactionTypeName;
                if(tranType === "expense"){
                  count=count+1;
                  // console.log(itemData.category);
                  temp += "<tr>";
                  // temp += "<td>" + count + "</td>";
                  temp += `<td class="tid">` + itemData.transactionId + "</td>";
                  // temp += "<td>" + itemData.transactionType.transactionTypeName + "</td>";
                  // var category = itemData.category;
                  // if(!("category" in itemData)){
                  //     console.log(itemData);
                  //     temp += "<td>" + "-" + "</td>";
                  // }else{
                      temp += "<td>" + itemData.category.categoryName + "</td>";
                  // }
                  temp += "<td>₹ " + itemData.debitAmount + "</td>";
                  // temp += "<td>" + itemData.creditAmount + "</td>";
                  temp += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                  temp+= `<td><span class="material-symbols-rounded edit-button">
                edit
                </span></td>`;
                temp+= `<td><span class="material-symbols-rounded delete-button">
                delete
                </span></td>`
                  // temp+= `<td><img src="assets/edit-icon.png" alt="edit" class="img img-responsive edit-img"></td>`;
                  // temp+= "<td><button>Delete</button></td>";
                  temp += "</tr>";
                }else{
                  count1=count1+1;
                  // console.log(itemData.category);
                  temp1 += "<tr>";
                  // temp1 += "<td>" + count1 + "</td>";
                  temp1 += `<td class="tid">` + itemData.transactionId + "</td>";
                  // temp1 += "<td>" + itemData.transactionType.transactionTypeName + "</td>";
                  // var category = itemData.category;
                  // if(!("category" in itemData)){
                  //     console.log(itemData);
                  //     temp1 += "<td>" + "-" + "</td>";
                  // }else{
                    temp1 += "<td>" + itemData.category.categoryName + "</td>";
                  // }
                  // temp1 += "<td>" + itemData.debitAmount + "</td>";
                  temp1 += "<td>₹ " + itemData.creditAmount + "</td>";
                  temp1 += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                  temp1+= `<td><span class="material-symbols-rounded edit-button1">
                edit
                </span></td>`;
                temp1+= `<td><span class="material-symbols-rounded delete-button1">
                delete
                </span></td>`
                  // temp1+= `<td><img src="assets/edit-icon.png" alt="edit" class="img img-responsive edit-img"></td>`;
                  // temp1+= "<td><button>Delete</button></td>";
                  temp1 += "</tr>";
                }


                
                
            });
        }else{
          temp = `<tr>No data</tr>`;
          temp1 = `<tr>No data</tr>`;
        }
          document.getElementById('data').innerHTML = temp;
          document.getElementById('data1').innerHTML = temp1;
      })
      displayTransaction();
      deleteTransaction();
      deleteTransaction1();
},false);




function addIncome(){
    const transactionForm = document.getElementById('transaction-income-form');
    transactionForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const transactionData = new FormData(transactionForm);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(transactionData.entries());
        

        
        var oldDate = new Date(formDataObject.transactionDate);

        formDataObject.transactionMonth = oldDate.getMonth()+1;
        formDataObject.transactionYear = oldDate.getFullYear();
        delete formDataObject.transactionDate;
        var categoryValue = formDataObject.category.split(" ");
        formDataObject.category = {categoryId:categoryValue[0],
          categoryName:categoryValue[1],userId:userId};
        console.log(formDataObject);
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);
        console.log(formDataJsonString);
        fetch(url+`${userId}/transactions/1/create`, {
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
            // alert("transaction added")
            // getTransactions();
            // closeTranForm();
            $('#addIncomeModal').modal('hide');
            window.location.reload();
          }else{
            alert("Not added ")
          }
        })
    });
}
function updateIncome(){
  const transactionForm = document.getElementById('income-detail-form');
  transactionForm.addEventListener('submit', (e)=>{
      e.preventDefault();

      const transactionData = new FormData(transactionForm);
      // const data = new URLSearchParams(formData);
      //Create an object from the form data entries
      let formDataObject = Object.fromEntries(transactionData.entries());
      

      
      var oldDate = new Date(formDataObject.transactionDate);

      formDataObject.transactionMonth = oldDate.getMonth()+1;
      formDataObject.transactionYear = oldDate.getFullYear();
      delete formDataObject.transactionDate;
      var categoryValue = formDataObject.category.split(" ");
      formDataObject.category = {categoryId:categoryValue[0],
        categoryName:categoryValue[1],userId:userId};
      console.log(formDataObject);
      // Format the plain form data as JSON
      let formDataJsonString = JSON.stringify(formDataObject);
      console.log(formDataJsonString);
      fetch(url+`${userId}/transactions/1/update`, {
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
          // alert("transaction added")
          // getTransactions();
          // closeTranForm();
          $('#detIncomeModal').modal('hide');
          window.location.reload();
        }else{
          alert("Not added ")
        }
      })
  });
}

function addExpense(){
    const transactioExpenseForm = document.getElementById('transaction-expense-form');
    transactioExpenseForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const transactionData = new FormData(transactioExpenseForm);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(transactionData.entries());
        

        
        var oldDate = new Date(formDataObject.transactionDate);

        formDataObject.transactionMonth = oldDate.getMonth()+1;
        formDataObject.transactionYear = oldDate.getFullYear();
        delete formDataObject.transactionDate;
        var categoryValue = formDataObject.category.split(" ");
        formDataObject.category = {categoryId:categoryValue[0],
          categoryName:categoryValue[1],userId:2};
        console.log(formDataObject);
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);
        console.log(formDataJsonString);
        fetch(url+`${userId}/transactions/2/create`, {
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
            // alert("transaction added")
            // getTransactions();
            // closeTranExpenseForm();
            $('#addExpenseModal').modal('hide');
            window.location.reload();

          }else{
            alert("Not added ")
          }
        })
    });
}
function updateExpense(){
  const transactioExpenseForm = document.getElementById('expense-detail-form');
  transactioExpenseForm.addEventListener('submit', (e)=>{
      e.preventDefault();

      const transactionData = new FormData(transactioExpenseForm);
      // const data = new URLSearchParams(formData);
      //Create an object from the form data entries
      let formDataObject = Object.fromEntries(transactionData.entries());
      

      
      var oldDate = new Date(formDataObject.transactionDate);

      formDataObject.transactionMonth = oldDate.getMonth()+1;
      formDataObject.transactionYear = oldDate.getFullYear();
      delete formDataObject.transactionDate;
      var categoryValue = formDataObject.categoryE.split(" ");
      formDataObject.category = {categoryId:categoryValue[0],
        categoryName:categoryValue[1],userId:userId};
      console.log(formDataObject);
      // Format the plain form data as JSON
      let formDataJsonString = JSON.stringify(formDataObject);
      console.log(formDataJsonString);
      fetch(url+`${userId}/transactions/2/update`, {
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
          // alert("transaction added")
          // getTransactions();
          // closeTranExpenseForm();
          $('#detExpenseModal').modal('hide');
          window.location.reload();

        }else{
          alert("Not added ")
        }
      })
  });
}

const batchTrack = document.getElementById("category");
var backTrack1 = document.getElementById('category1');
var exCategoryE = document.getElementById('dtcategoryE');
var inCategory = document.getElementById('dtcategory2');

const getCategories = async () => {
  const response =await fetch(url+`${userId}/category`);
  // console.log(response);
  const data = await response.json();
  return data;
};


const displayOption = async () => {
  
  const options =await getCategories();
  // options.forEach(option => {
    for(option of options){
      var newOption1 = document.createElement("option");
      var newOption2= document.createElement("option");
      var newOption3 = document.createElement("option");
      var newOption4 = document.createElement("option");
      // console.log(option);
      newOption1.value = option.categoryId + " " + option.categoryName;
      newOption1.text = option.categoryName;
      newOption2.value = option.categoryId + " " + option.categoryName;
      newOption2.text = option.categoryName;
      newOption3.value = option.categoryId + " " + option.categoryName;
      newOption3.text = option.categoryName;
      newOption4.value = option.categoryId + " " + option.categoryName;
      newOption4.text = option.categoryName;
      batchTrack.appendChild(newOption1);
      backTrack1.appendChild(newOption2);
      exCategoryE.appendChild(newOption3);
      inCategory.appendChild(newOption4);
      
    }
    console.log(exCategoryE);
  // });
};

async function displayTransaction(){
  // const reminder =  getOneReminder(billId);
  var editBtns = document.querySelectorAll('.edit-button');
    
    editBtns.forEach((btn)=>{btn.onclick = function(ev) {
    // ev.target <== td element
    // ev.target.parentElement <== tr
    var index = ev.target.parentElement;
    var row= index.parentElement;
    console.log(row);
  // var row = document.getElementById('data').children[index-1];
  // console.log(document.getElementById('data').children[index-1]);
  var transactionId = row.children[0].innerHTML;
  console.log(transactionId);
  // openDetailsForm();
  $('#detExpenseModal').modal('show');
  var dtId = document.getElementById('dtid');
  // var dtType = document.getElementById('dttype');
  var dtCategory = document.getElementById('dtcategoryE');
  // var dtCategory1 = document.getElementById('dtcategory1');
  var dtdate = document.getElementById('dtdate');
  var dtDebit = document.getElementById('dtdebit');
  // var dtCredit = document.getElementById('dtcredit');
  var dtDescription = document.getElementById('dtdescription');
  // var dbillName = document.getElementById('dbillName');
  fetch(url+`${userId}/transactions/${transactionId}`).then((response)=> response.json())
  .then((data)=>{
  //   if(data != null){
  //     console.log(data);
  //     // alert("transaction added")
  //     getTransactions();
  //   }else{
  //     // alert("Not added ")
  //   }
      // console.log(data);
      dtId.value = data.transactionId;
      // dtType.value = data.transactionType.transactionTypeName;
      // if(("category" in data )){
      //   dtCategory1.style.display ="block";
      //   dtCategory.style.display ="block";
        dtCategory.value =data.category.categoryId + " " + data.category.categoryName;
      // }else{
      //   dtCategory1.style.display ="none";
      // }
      var month = ("0" + (data.transactionMonth)).slice(-2);
      dtdate.value = data.transactionYear+"-"+month;
      // console.log(dtdate.value);
      dtDebit.value = data.debitAmount;
      // dtCredit.value = data.creditAmount;
      dtDescription.value = data.description;
  });
  // console.log(response);
  // const data = response.json();
  // return data;
  

  
  }
})
var editBtns1 = document.querySelectorAll('.edit-button1');
    
editBtns1.forEach((btn)=>{btn.onclick = function(ev) {
// ev.target <== td element
// ev.target.parentElement <== tr
var index = ev.target.parentElement;
var row= index.parentElement;
console.log(row);
// var row = document.getElementById('data').children[index-1];
// console.log(document.getElementById('data').children[index-1]);
    var transactionId = row.children[0].innerHTML;
    console.log(transactionId);
    // openDetails1Form();
    $('#detIncomeModal').modal('show');
    var dtId = document.getElementById('dtid1');
    // var dtType = document.getElementById('dttype');
    // var dtCategory = document.getElementById('dtcategory');
    var dtCategory2 = document.getElementById('dtcategory2');
    var dtdate = document.getElementById('dtdate1');
    // var dtDebit = document.getElementById('dtdebit');
    var dtCredit = document.getElementById('dtcredit1');
    var dtDescription = document.getElementById('dtdescription1');
    // var dbillName = document.getElementById('dbillName');
    fetch(url+`${userId}/transactions/${transactionId}`).then((response)=> response.json())
    .then((data)=>{
    //   if(data != null){
    //     console.log(data);
    //     // alert("transaction added")
    //     getTransactions();
    //   }else{
    //     // alert("Not added ")
    //   }
        console.log(data);
        dtId.value = data.transactionId;
        // dtType.value = data.transactionType.transactionTypeName;
        // if(("category" in data )){
        //   dtCategory1.style.display ="block";
        //   dtCategory.style.display ="block";
          dtCategory2.value =data.category.categoryId + " " + data.category.categoryName;
        // }else{
        //   dtCategory1.style.display ="none";
        // }
        var month = ("0" + (data.transactionMonth)).slice(-2);
        dtdate.value = data.transactionYear+"-"+month;
        // console.log(dtdate.value);
        // dtDebit.value = data.debitAmount;
        dtCredit.value = data.creditAmount;
        dtDescription.value = data.description;
    });
    // console.log(response);
    // const data = response.json();
    // return data;
    
  
    
    }
  })
}

function deleteTransaction(){
  var editBtns = document.querySelectorAll('.delete-button');
    
    editBtns.forEach((btn)=>{btn.onclick =async function(ev) {
    // ev.target <== td element
    // ev.target.parentElement <== tr
        var index = ev.target.parentElement;
        var row= index.parentElement;
        console.log(row);
        // var row = document.getElementById('data').children[index-1];
        // console.log(document.getElementById('data').children[index-1]);
        var id = row.children[0].innerHTML;
        // console.log(billId);
  // var id = document.getElementById('dtid').value;
  //   console.log(id);
    fetch(url+`${userId}/transactions/${id}`, {
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
            $('#detExpenseModal').modal('hide');
            // getTransactions();
            window.location.reload();
          }
    })
  }})
}
function deleteTransaction1(){
  var editBtns = document.querySelectorAll('.delete-button1');
    
    editBtns.forEach((btn)=>{btn.onclick =async function(ev) {
    // ev.target <== td element
    // ev.target.parentElement <== tr
        var index = ev.target.parentElement;
        var row= index.parentElement;
        console.log(row);
        // var row = document.getElementById('data').children[index-1];
        // console.log(document.getElementById('data').children[index-1]);
        var id = row.children[0].innerHTML;
        // console.log(billId);
  // var id = document.getElementById('dtid1').value;
  //   console.log(id);
    fetch(url+`${userId}/transactions/${id}`, {
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
            // closeDetails1Form();
            $('#detIncomeModal').modal('hide');
            // getTransactions();
            window.location.reload();
          }
    })
  }})
}

function showFile(blob){
  var statementPeriod =sessionStorage.getItem("period");
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], {type: "application/pdf"})

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  } 

  // For other browsers: 
  // Create a link pointing to the ObjectURL containing the blob.
  const dataPDF = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = dataPDF;
  link.download=`transactions-${statementPeriod}.pdf`;
  link.click();
  var reader = new FileReader();
reader.readAsDataURL(blob);
var base64data=''; 
reader.onloadend = function() {
  base64data = reader.result;
  // base64data = base64data.slice(5)                
  // console.log(base64data);
  // console.log(base64data.slice(5));
  var email = sessionStorage.getItem('email');
  Email.send({
    SecureToken : "5718f57b-0f4b-4675-b765-e65c1cc86def",
    To : email,
    From : "deathracer384@gmail.com",
    Subject : "Monthly Statement",
    Body : `Here is your requested transaction statement`,
    Attachments : [
      {
       name :`transactions-${statementPeriod}.pdf`,
       data : base64data
      }]
}).then(
  // message => alert(message)
);
}
  
  setTimeout(function(){
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
  }, 100);
}
function generatePDF() {
  var statementPeriod = document.getElementById('budgetMonth').value;
  sessionStorage.setItem("period",statementPeriod);
  var periodHtml = `<h2>Month: ${statementPeriod}</h2><br>`
  var table =periodHtml + "<h3>Expenses</h3>" + document.getElementsByClassName('pdf')[0].innerHTML + "<hr>";
  table = table + "<h3>Income</h3>" + document.getElementsByClassName('pdf')[1].innerHTML
  // console.log(table);
  var transactionTable = {};
  transactionTable.table = table;
  let formDataJsonString = JSON.stringify(transactionTable);
  fetch(url+`${userId}/transactions/download`, {
    method:'POST', 
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
},
    body: formDataJsonString
}).then((response)=> response.blob())
.then(showFile)  
}



getTransactions();
displayOption();
addIncome();
addExpense();

updateExpense();
updateIncome();