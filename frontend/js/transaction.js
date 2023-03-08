// var transactions = [];
// var transaction = {transactionType:"",category:"",debitAmount:0,creditAmount:0,month:0,year:0}
function openTranForm() {
    document.getElementById("transaction-income-page").style.display = "block";
  }

function closeTranForm() {
    document.getElementById("transaction-income-page").style.display = "none";
  }

  function openTranExpenseForm() {
    document.getElementById("transaction-expense-page").style.display = "block";
  }

function closeTranExpenseForm() {
    document.getElementById("transaction-expense-page").style.display = "none";
  }

function getTransactions(){

    fetch('http://localhost:8080/finwise/2/transactions', {
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
            // console.log(itemData.category);
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
            
        });
        document.getElementById('data').innerHTML = temp;
    })
}




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
        fetch('http://localhost:8080/finwise/2/transactions/1/create', {
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
            alert("transaction added")
            getTransactions();
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
        fetch('http://localhost:8080/finwise/2/transactions/2/create', {
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
            alert("transaction added")
            getTransactions();
          }else{
            alert("Not added ")
          }
        })
    });
}

const batchTrack = document.getElementById("category");
const getCategories = async () => {
  const response =await fetch("http://localhost:8080/finwise/2/category");
  console.log(response);
  const data = await response.json();
  return data;
};

const displayOption = async () => {
  const options =await getCategories();
  // options.forEach(option => {
    for(option of options){
      const newOption = document.createElement("option");
      console.log(option);
      newOption.value = option.categoryId + " " + option.categoryName;
      newOption.text = option.categoryName;
      batchTrack.appendChild(newOption);
    }

  // });
};


getTransactions();
displayOption();
addIncome();
addExpense();