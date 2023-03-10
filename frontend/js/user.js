if(sessionStorage.getItem("loggedIn") != "true"){
    window.location.href = "index.html";
}

const userId = sessionStorage.getItem('userId');

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

displayUser();
// logout();
updateUser();