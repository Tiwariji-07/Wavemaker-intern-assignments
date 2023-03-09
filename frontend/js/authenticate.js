function showLogin(){
  document.getElementById('login-page').style.display="flex";
  document.getElementsByClassName('layer')[0].style.display="block";
  document.getElementsByTagName('body')[0].style.overflowY="hidden";
}

function closeLogin(){
  document.getElementById('login-page').style.display="none";
  document.getElementsByClassName('layer')[0].style.display="none";
  document.getElementsByTagName('body')[0].style.overflowY="scroll";
}

// document.onkeydown = function(evt) {
//   evt = evt || window.event;
//   if (evt.k == 27) {
//     closeLogin();
//   }
// };

const form = document.getElementById('login-form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData = new FormData(form);
    // const data = new URLSearchParams(formData);
     //Create an object from the form data entries
  let formDataObject = Object.fromEntries(formData.entries());
    // Format the plain form data as JSON
    let formDataJsonString = JSON.stringify(formDataObject);

    console.log(formDataJsonString);
    fetch('http://localhost:8080/finwise/login', {
        method:'POST', 
         //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
        body: formDataJsonString
    }).then((response) => {
        // An important thing to note is that an error response will not throw
        // an error so if the result is not okay we should throw the error
        if(!response.ok) {
          throw response;
        }
    
        // since we expect a json response we will return a json call
        const res = response.json();
        res.then((user)=>{
            console.log(user.userId);
            if(user.userId != 0){
              sessionStorage.setItem("userId", user.userId);
              sessionStorage.setItem("loggedIn", "true");
                // alert("succesfully logged in")
                window.location.href = "overview.html"
            }else{
                alert("Wrong credentials")
            }
        })
      })
});

