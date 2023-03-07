
// var editButton = document.createElement('button');
// editButton.innerText= "Edit";
// var att = document.createAttribute('class');
// att.value = "btn reminder-btn"
// editButton.setAttributeNode(att);

function showReminders(){

    fetch('http://localhost:8080/finwise/2/reminder', {
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
            console.log(itemData);
            count=count+1;
            temp += "<tr>";
            temp += "<td>" + count + "</td>";
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
        document.getElementById("myForm").style.display = "block";
      }
    
function closeForm() {
        document.getElementById("myForm").style.display = "none";
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
        console.log(formDataObject);
        // Format the plain form data as JSON
        let formDataJsonString = JSON.stringify(formDataObject);
        
        fetch('http://localhost:8080/finwise/2/reminder/create', {
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
            alert("reminder added")
            showReminders();
          }else{
            alert("Not added ")
          }
        })
    });
    
}
showReminders();
addBillReminder();