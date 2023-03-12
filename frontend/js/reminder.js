if(sessionStorage.getItem("loggedIn") != "true"){
    window.location.href = "index.html";
}

const userId = sessionStorage.getItem('userId');
// var editButton = document.createElement('button');
// editButton.innerText= "Edit";
// var att = document.createAttribute('class');
// att.value = "btn reminder-btn"
// editButton.setAttributeNode(att);

var rDate = document.getElementById('date');
rDate.min = new Date().toLocaleDateString('fr-ca');
var rdDate = document.getElementById('ddate');
rdDate.min = new Date().toLocaleDateString('fr-ca');

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
        var temp="";
        console.log(data.length);
        // clg
        if(data.length !=0){
            data.forEach((itemData) => {
                console.log(itemData);
                count=count+1;
                var recurringDate;
                var rd;
                if(itemData.isRecurring){
                    var d = new Date(formatDate(itemData.reminderDate)).getDate();
                    console.log(d);
                    var r = new Date(formatDate(itemData.reminderDate)).setMonth(currMonth-1);
                    var d1 = new Date(r).getDate();
                    console.log(d1);
                    if(d <= d1 ){
                     recurringDate = new Date(formatDate(itemData.reminderDate)).setMonth(currMonth-1);
                     rd = new Date(recurringDate).toDateString();
                    //  recurringDate.toLocaleString();
                    // console.log(rd);
                    }else{
                        return;
                    }
                }else{
                    rd = itemData.reminderDate;
                }
                temp += "<tr>";
                temp += "<td>" + count + "</td>";
                temp += "<td>" + itemData.billId + "</td>";
                temp += "<td>" + itemData.billName + "</td>";
                temp += "<td>" + rd + "</td>";
                temp += "<td>" + itemData.billAmount + "</td>";
                // temp+= "<td><button>Edit</button></td>";
                // temp+= "<td><button>Delete</button></td>";
                temp += "</tr>";
                activeDates.push(formatDate(rd));
            });
        }else{
            temp = `<tr>No data</tr>`
        }
        document.getElementById('data').innerHTML = temp;
        // calender();
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
            showAlert("Added successfully !");
            setTimeout(hideAlert,2000)
            // showReminders();
            closeForm();
            // window.location.reload();
            renderCalendar();
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

async function deleteReminder(){
    var id = document.getElementById('dbillId').value;
    console.log(id);
    await fetch(`http://localhost:8080/finwise/${userId}/reminder/${id}`, {
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
            showAlert("Deleted Successfully.");
            setTimeout(hideAlert,2000)
            closeDetailsForm();
            
            // renderCalendar();
            // showReminders();
          }
    })
    window.location.reload();
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
            // showAlert("Updated Successfully");
            // setTimeout(hideAlert,2000)
            closeDetailsForm();
            window.location.reload();
            // renderCalendar();s
            // showReminders();
          }else{
            alert("Not added ");
          }
        })
    });
    
}

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
function reminderPopup(){
    var currentDate = new Date().toDateString();
    console.log(currentDate);
    var newDate = currentDate.substring(4,10) + ", " + currentDate.substring(11,);
        console.log(newDate);
    fetch(`http://localhost:8080/finwise/${userId}/reminder`, {
    method:'GET', 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    }).then((response) => response.json())
    .then((data) => {
        // var count = 0;
        // var temp;
        // console.log(data);
        data.forEach((itemData) => {
            var reminderDate  = itemData.reminderDate;
            // console.log(reminderDate);
            if(newDate === reminderDate){
                // alert(`Pay your ${itemData.billName} bill.`)
                var message = `Please pay your ${itemData.billName} bill of Rs.${itemData.billAmount}`
                showAlert(message);
                setTimeout(hideAlert,2000)
            }
        });
        // document.getElementById('data').innerHTML = temp;
    })
}


// function calender(){
    const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
    // getting new date, current year and month
    let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();
    // storing full name of all months in array
    const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
    const renderCalendar =async () => {
        await showReminders(currMonth+1,currYear)
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
            activeDates.forEach((date)=>{
                var date1 = new Date(date);
                // console.log(date1);
                if(i === date1.getDate() && currMonth === date1.getMonth()
                        && currYear === date1.getFullYear()){
                            isToday = "active";
                }
            });
            if(i === new Date().getDate() && currMonth === new Date().getMonth() 
                && currYear === new Date().getFullYear()){
                    isToday = "present"
                }
            
            
            liTag += `<li class="${isToday}">${i}</li>`;
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
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear(); // updating current year with new date year
                currMonth = date.getMonth(); // updating current month with new date month
            } else {
                date = new Date(); // pass the current date as date value
            }
            renderCalendar(); // calling renderCalendar function
            
        });
    });
// }

// showReminders();
displayReminder();
addBillReminder();
updateBillReminder();
reminderPopup();
// calender();
