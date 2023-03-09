if(sessionStorage.getItem("loggedIn") != "true"){
    window.location.href = "index.html";
}

const userId = sessionStorage.getItem('userId');
// var editButton = document.createElement('button');
// editButton.innerText= "Edit";
// var att = document.createAttribute('class');
// att.value = "btn reminder-btn"
// editButton.setAttributeNode(att);


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


function showReminders(){

    fetch(`http://localhost:8080/finwise/${userId}/reminder`, {
    method:'GET', 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    }).then((response) => response.json())
    .then((data) => {
        var count = 0;
        var temp;
        console.log(data);
        data.forEach((itemData) => {
            console.log(itemData);
            count=count+1;
            temp += "<tr>";
            temp += "<td>" + count + "</td>";
            temp += "<td>" + itemData.billId + "</td>";
            temp += "<td>" + itemData.billName + "</td>";
            temp += "<td>" + itemData.reminderDate + "</td>";
            temp += "<td>" + itemData.billAmount + "</td>";
            // temp+= "<td><button>Edit</button></td>";
            // temp+= "<td><button>Delete</button></td>";
            temp += "</tr>";
        });
        document.getElementById('data').innerHTML = temp;
    })
    
}

function openForm() {
    document.getElementById("myForm").style.display = "flex";
    document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}
    
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}
function openDetailsForm() {
document.getElementById("detailForm").style.display = "flex";
document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}

function closeDetailsForm() {
document.getElementById("detailForm").style.display = "none";
document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}

function addBillReminder(){
    const reminderForm = document.getElementById('reminder-form');
    reminderForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const reminderData = new FormData(reminderForm);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(reminderData.entries());
        

        
        var oldDate = new Date(formDataObject.reminderDate);
        console.log( oldDate.toLocaleDateString() + "\n" + oldDate.toISOString() + "\n" +
         oldDate.toDateString() +"\n" + oldDate.toUTCString()
        );
        var newDate = oldDate.toDateString().substring(4,10) + ", " + oldDate.toDateString().substring(11,);
        console.log(newDate);
        formDataObject.reminderDate = newDate;
        formDataObject.isActive=true;
        console.log(formDataObject);
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);
        
        fetch(`http://localhost:8080/finwise/${userId}/reminder/create`, {
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
            // alert("reminder added")
            showReminders();
            closeForm();
          }else{
            alert("Not added ")
          }
        })
    });
    
}

// const getOneReminder = async (id) => {
//     const response =await fetch(`http://localhost:8080/finwise/2/reminder/${id}`);
//     console.log(response);
//     const data = await response.json();
//     return data;
//   };
async function displayReminder(){
    // const reminder =  getOneReminder(billId);
    document.querySelector('#data').onclick = function(ev) {
    // ev.target <== td element
    // ev.target.parentElement <== tr
    var index = ev.target.parentElement.rowIndex;
    console.log(index);
    var row = document.getElementById('data').children[index-1];
    console.log(document.getElementById('data').children[index-1]);
    var billId = row.children[1].innerHTML;
    console.log(billId);
    openDetailsForm();
    var dbillId = document.getElementById('dbillId');
    var dbillName = document.getElementById('dbillName');
    var damount = document.getElementById('damount');
    var ddate = document.getElementById('ddate');
    // var dbillName = document.getElementById('dbillName');
    fetch(`http://localhost:8080/finwise/${userId}/reminder/${billId}`).then((response)=> response.json())
    .then((data)=>{
    //   if(data != null){
    //     console.log(data);
    //     // alert("transaction added")
    //     getTransactions();
    //   }else{
    //     // alert("Not added ")
    //   }
        console.log(data);
        dbillId.value = data.billId;
        dbillName.value = data.billName;
        damount.value = data.billAmount;
        ddate.value = formatDate(data.reminderDate);
        if(data.isRecurring){
            console.log(data.isRecurring);
            document.getElementById('true').click();
        }else{
            console.log(data.isRecurring);
            document.getElementById('false').click();
        }
    });
    // console.log(response);
    // const data = response.json();
    // return data;
    

    
    }
}

function deleteReminder(){
    var id = document.getElementById('dbillId').value;
    console.log(id);
    fetch(`http://localhost:8080/finwise/${userId}/reminder/${id}`, {
            method:'DELETE', 
            //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        }).then((response)=> response.json())
        .then((data)=>{
          if(data != null){
            console.log(data);
            // alert("reminder deleted");
            closeDetailsForm();
            showReminders();
          }
    })
}

function updateBillReminder(){
    const reminderForm = document.getElementById('reminder-detail-form');
    reminderForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const reminderData = new FormData(reminderForm);
        // const data = new URLSearchParams(formData);
        //Create an object from the form data entries
        let formDataObject = Object.fromEntries(reminderData.entries());
        

        
        var oldDate = new Date(formDataObject.reminderDate);
        console.log( oldDate.toLocaleDateString() + "\n" + oldDate.toISOString() + "\n" +
         oldDate.toDateString() +"\n" + oldDate.toUTCString()
        );
        var newDate = oldDate.toDateString().substring(4,10) + ", " + oldDate.toDateString().substring(11,);
        console.log(newDate);
        formDataObject.reminderDate = newDate;
        formDataObject.isActive=true;
        console.log(formDataObject);
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);
        
        fetch(`http://localhost:8080/finwise/${userId}/reminder/update`, {
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
            // alert("reminder saved");
            closeDetailsForm();
            showReminders();
          }else{
            alert("Not added ");
          }
        })
    });
    
}


showReminders();
displayReminder();
addBillReminder();
updateBillReminder();