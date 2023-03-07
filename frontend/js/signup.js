
function showRegister(){
  document.getElementById('register-page').style.display="flex";
}

function closeRegister(){
  document.getElementById('register-page').style.display="none";
}

const form1 = document.getElementById('register-form');
form1.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData = new FormData(form1);
    // const data = new URLSearchParams(formData);
     //Create an object from the form data entries
  let formDataObject = Object.fromEntries(formData.entries());
    // Format the plain form data as JSON
    let formDataJsonString = JSON.stringify(formDataObject);

    // console.log(formDataJsonString);
    fetch('http://localhost:8080/finwise/user/create', {
        method:'POST', 
         //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
        body: formDataJsonString
    }).then((response)=> response.json())
    .then((data)=>{
      if(!data){
        console.log(data);
        alert("User with this email already exists !!!")
      }else{
        alert("Successfully registered. ")
      }
    })
});