function openUserDetailsForm() {
    document.getElementById("user-detail-page").style.display = "block";
    displayUser();
}
    
function closeUserDetailsForm() {
    document.getElementById("user-detail-page").style.display = "none";
}

var reminderData = document.getElementById('reminder-data');

var temp;

fetch('http://localhost:8080/finwise/2/reminder', {
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
    fetch(`http://localhost:8080/finwise/user/2`).then((response)=> response.json())
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

updateUser();

getTransactions();