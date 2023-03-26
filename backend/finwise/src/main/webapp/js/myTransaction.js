
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
    budgetMonth.addEventListener('change', (e)=>{

      
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

      fetch(url+`${userId}/transactions/period`, {
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
                temp += "<td>" + count + "</td>";
                temp += "<td>" + itemData.transactionId + "</td>";
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
                // temp+= "<td><button>Edit</button></td>";
                temp+= `<td><img src="assets/edit-icon.png" alt="" class="img img-responsive edit-img"></td>`;
                // temp+= "<td><button>Delete</button></td>";
                temp += "</tr>";
              }else{
                count1=count1+1;
                // console.log(itemData.category);
                temp1 += "<tr>";
                temp1 += "<td>" + count1 + "</td>";
                temp1 += "<td>" + itemData.transactionId + "</td>";
                // temp1 += "<td>" + itemData.transactionType.transactionTypeName + "</td>";
                // var category = itemData.category;
                // if(!("category" in itemData)){
                //     console.log(itemData);
                //     temp1 += "<td>" + "-" + "</td>";
                // }else{
                //     temp1 += "<td>" + itemData.category.categoryName + "</td>";
                // }
                // temp1 += "<td>" + itemData.debitAmount + "</td>";
                temp1 += "<td>₹ " + itemData.creditAmount + "</td>";
                temp1 += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                temp1+= `<td><button><img src="assets/edit-icon.png" alt="edit" class="img img-responsive edit-img"></button></td>`;
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
}

document.addEventListener('DOMContentLoaded', function() {
  var formDataObject = {};

  formDataObject.month = month;
      formDataObject.year = year;
      rDate.value = `${year}-${month}`;
      rDate1.value = `${year}-${month}`;
  let formDataJsonString = JSON.stringify(formDataObject);
  fetch(url+`${userId}/transactions/period`, {
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
                  temp += "<td>" + count + "</td>";
                  temp += "<td>" + itemData.transactionId + "</td>";
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
                  // temp+= "<td><button>Edit</button></td>";
                  temp+= `<td><img src="assets/edit-icon.png" alt="edit" class="img img-responsive edit-img"></td>`;
                  // temp+= "<td><button>Delete</button></td>";
                  temp += "</tr>";
                }else{
                  count1=count1+1;
                  // console.log(itemData.category);
                  temp1 += "<tr>";
                  temp1 += "<td>" + count1 + "</td>";
                  temp1 += "<td>" + itemData.transactionId + "</td>";
                  // temp1 += "<td>" + itemData.transactionType.transactionTypeName + "</td>";
                  // var category = itemData.category;
                  // if(!("category" in itemData)){
                  //     console.log(itemData);
                  //     temp1 += "<td>" + "-" + "</td>";
                  // }else{
                  //     temp1 += "<td>" + itemData.category.categoryName + "</td>";
                  // }
                  // temp1 += "<td>" + itemData.debitAmount + "</td>";
                  temp1 += "<td>₹ " + itemData.creditAmount + "</td>";
                  temp1 += "<td>" + itemData.transactionMonth +"/"+itemData.transactionYear + "</td>";
                  // temp1+= "<td><button>Edit</button></td>";
                  temp1+= `<td><img src="assets/edit-icon.png" alt="edit" class="img img-responsive edit-img"></td>`;
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
            closeTranForm();
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
            closeTranExpenseForm(); 
            window.location.reload();

          }else{
            alert("Not added ")
          }
        })
    });
}

const batchTrack = document.getElementById("category");
// var dtCategory1 = document.getElementById('dtcategory1');
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
      const newOption = document.createElement("option");
      // console.log(option);
      newOption.value = option.categoryId + " " + option.categoryName;
      newOption.text = option.categoryName;
      batchTrack.appendChild(newOption);
      // dtCategory1.appendChild(newOption);
    }

  // });
};

async function displayTransaction(){
  // const reminder =  getOneReminder(billId);
  document.querySelector('#data').onclick = function(ev) {
  // ev.target <== td element
  // ev.target.parentElement <== tr
  var index = ev.target.parentElement.rowIndex;
  console.log(index);
  var row = document.getElementById('data').children[index-1];
  console.log(document.getElementById('data').children[index-1]);
  var transactionId = row.children[1].innerHTML;
  console.log(transactionId);
  openDetailsForm();
  var dtId = document.getElementById('dtid');
  // var dtType = document.getElementById('dttype');
  var dtCategory = document.getElementById('dtcategory');
  var dtCategory1 = document.getElementById('dtcategory1');
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
      if(("category" in data )){
        dtCategory1.style.display ="block";
        dtCategory.style.display ="block";
        dtCategory.value = data.category.categoryName;
      }else{
        dtCategory1.style.display ="none";
      }
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
  document.querySelector('#data1').onclick = function(ev) {
    // ev.target <== td element
    // ev.target.parentElement <== tr
    var index = ev.target.parentElement.rowIndex;
    console.log(index);
    var row = document.getElementById('data1').children[index-1];
    console.log(document.getElementById('data1').children[index-1]);
    var transactionId = row.children[1].innerHTML;
    console.log(transactionId);
    openDetails1Form();
    var dtId = document.getElementById('dtid1');
    // var dtType = document.getElementById('dttype');
    // var dtCategory = document.getElementById('dtcategory');
    // var dtCategory1 = document.getElementById('dtcategory1');
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
        //   dtCategory.value = data.category.categoryName;
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
}

function deleteTransaction(){
  var id = document.getElementById('dtid').value;
    console.log(id);
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
            closeDetailsForm();
            // getTransactions();
            window.location.reload();
          }
    })
}
function deleteTransaction1(){
  var id = document.getElementById('dtid1').value;
    console.log(id);
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
            closeDetails1Form();
            // getTransactions();
            window.location.reload();
          }
    })
}

// var pdf = new jsPDF('p', 'pt', [580, 630]);
// var content = document.getElementsByClassName('t-jumbotron')[0].innerHTML;
// html2canvas(content, {
//     onrendered: function(canvas) {
//         document.body.appendChild(canvas);
//         var ctx = canvas.getContext('2d');
//         var imgData = canvas.toDataURL("image/png", 1.0);
//         var width = canvas.width;
//         var height = canvas.clientHeight;
//         pdf.addImage(imgData, 'PNG', 20, 20, (width - 10), (height));

//     }
// });
// setTimeout(function() {
//     //jsPDF code to save file
//     pdf.save('sample.pdf');
// }, 0);

function generatePDF() {
  // Create a new jsPDF instance
  
  var doc = new jsPDF('p', 'pt', 'a4');

  // Get the HTML table element
  var table = document.getElementsByClassName('t-jumbotron')[0].innerHTML;

  // Convert the table to a data URL
  tableToDataURL(table, function(dataURL) {
    // Add the table as an image to the PDF document
    doc.addImage(dataURL, 'PNG', 10, 10, 180, 0);

    // Download the PDF document
    setTimeout(function() {
      // Download the PDF document
      doc.save('transactions.pdf');
    }, 100);
  });
  
}

function tableToDataURL(table) {
  // Create a new canvas element
  var canvas = document.createElement('canvas');

  // Get the table dimensions
  var width = table.offsetWidth;
  var height = table.offsetHeight;

  // Set the canvas dimensions
  canvas.width = width;
  canvas.height = height;

  // Draw the table on the canvas
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var img = new Image();
  img.src = 'data:image/svg+xml,' + encodeURIComponent(table.outerHTML);
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    // Wait for the canvas to fully render before converting to a data URL
    setTimeout(function() {
      var dataURL = canvas.toDataURL('image/png');
      return dataURL;
    }, 100);
  };
}


// var specialElementHandlers = {
//   // element with id of "bypass" - jQuery style selector
//   '.no-export': function (element, renderer) {
//       // true = "handled elsewhere, bypass text extraction"
//       return true;
//   }
// };

// function exportPDF() {
//   var doc = new jsPDF('p', 'pt', 'a4');
//   //A4 - 595x842 pts
//   //https://www.gnu.org/software/gv/manual/html_node/Paper-Keywords-and-paper-size-in-points.html


//   //Html source 
//   var source = document.getElementById("expense-table");
// console.log(source);
//   var margins = {
//       top: 10,
//       bottom: 10,
//       left: 10,
//       width: 600
//   };

//   doc.fromHTML(
//       source, // HTML string or DOM elem ref.
//       margins.left,
//       margins.top, {
//           'width': margins.width,
//           'elementHandlers': specialElementHandlers
//       },

//       function (dispose) {
//           // dispose: object with X, Y of the last line add to the PDF 
//           //          this allow the insertion of new lines after html
//           doc.save('Test.pdf');
//       }, margins);
// }

getTransactions();
displayOption();
addIncome();
addExpense();
displayTransaction();