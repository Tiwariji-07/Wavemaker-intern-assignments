// var transactions = [];
// var transaction = {transactionType:"",category:"",debitAmount:0,creditAmount:0,month:0,year:0}
async function getTransactions(){

await fetch('http://localhost:8080/finwise/2/transactions', {
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


getTransactions();


