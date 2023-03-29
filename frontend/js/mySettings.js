//const url = 'http://18.191.127.230:8080/finwise/services/'
const url = 'http://localhost:8080/finwise/services/'

if(sessionStorage.getItem("loggedIn") != "true"){
  window.location.href = "index.html";
}

const userId = sessionStorage.getItem('userId');

const pressedButtonSelector = '[data-theme][aria-pressed="true"]';
const defaultTheme = 'blue';

const applyTheme = (theme) => {
  const target = document.querySelector(`[data-theme="${theme}"]`);
  document.documentElement.setAttribute("data-selected-theme", theme);
  document.querySelector(pressedButtonSelector).setAttribute('aria-pressed', 'false');
  target.setAttribute('aria-pressed', 'true');
  // target.style.border = "3px solid #C060A1";
  target.classList.add('active-theme');
};

const handleThemeSelection = (event) => {
  const target = event.target;
  const isPressed = target.getAttribute('aria-pressed');
  const theme = target.getAttribute('data-theme');        
  console.log(isPressed);
  console.log(theme);
  if(isPressed !== "true") {
    buttons.forEach((button) => {
      // button.style.border=0;
      button.classList.remove('active-theme');
      //  button.addEventListener('click', handleThemeSelection);
    });
    applyTheme(theme);
    localStorage.setItem('selected-theme', theme);
    
    // target.style.border = "3px solid #C060A1"
  }
}

const setInitialTheme = () => {
  const savedTheme = localStorage.getItem('selected-theme');
  console.log(savedTheme);
  if(savedTheme && savedTheme !== defaultTheme) {
    applyTheme(savedTheme);
  }else{
    const target = document.querySelector(`[data-theme="${defaultTheme}"]`);
  document.documentElement.setAttribute("data-selected-theme", defaultTheme);
  document.querySelector(pressedButtonSelector).setAttribute('aria-pressed', 'false');
  target.setAttribute('aria-pressed', 'true');
  // target.style.border = "3px solid #C060A1";
  target.classList.add('active-theme');
  }
};

setInitialTheme();

const themeSwitcher = document.querySelector('#theme');
const buttons = themeSwitcher.querySelectorAll('img');

buttons.forEach((button) => {
  // button.style.border=0;
   button.addEventListener('click', handleThemeSelection);
});


//category part*********************************************************************************

async function showCategories(){
  await fetch(url+`${userId}/category`, {
    method:'GET', 
      //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
        Accept: "application/json",
    }
  }).then((response) => response.json())
  .then((data) => {
      var count = 0;
      
      console.log(data.length);
      // clg
      if(data.length !=0){
          var temp="";
          temp+=`<button class="btn add-btn" type="button" data-toggle="modal" data-target="#myModal"><img src="assets/add-icon.png" alt="add"></button>`
          data.forEach((itemData) => {
              // console.log(itemData);
              // count=count+1;
              // temp += "<tr>";
              // // temp += "<td>" + count + "</td>";
              // temp += "<td>" + itemData.categoryId + "</td>";
              // temp += "<td>" + itemData.categoryName + "</td>";
              // temp += "</tr>";
              
              temp+=`<div class="category-card">
              <span class="material-symbols-rounded">
                  category
              </span>
              <p>${itemData.categoryId}</p>
              <h4>${itemData.categoryName}</h4>
              <td><span class="material-symbols-rounded edit-button">
                edit
                </span></td>
                <td><span class="material-symbols-rounded delete-button">
                delete
                </span></td>
          </div>`
          });
          // document.getElementById('data').innerHTML = temp;
      }else{
          flag=false;
          var temp="";
          // temp = `<img src="assets/no-result-found.svg" class="img img-responsive result-img"/>`
          temp += `No Categories`;
          // document.getElementsByClassName('r-jumbotron')[0].innerHTML = temp;
      }
      
      // calender();
      // if(flag){
          document.getElementById('category-list').innerHTML = temp;
      // }else{
      //     document.getElementsByClassName('r-jumbotron')[0].innerHTML = temp;
      // }
  })
  
  categoryDetails();
  deleteCategory();
}

function addCategory(){
  const categoryForm = document.getElementById('add-category-form');
  categoryForm.addEventListener('submit',async (e)=>{
      e.preventDefault();
      const categoryData = new FormData(categoryForm);
      let formDataObject = Object.fromEntries(categoryData.entries());
      formDataObject.userId = userId;
      console.log(formDataObject);
      // Format the plain form data as JSON
      let formDataJsonString = JSON.stringify(formDataObject);
      console.log(formDataJsonString);
      await fetch(url+`${userId}/category/create`, {
          method:'POST', 
          //Set the headers that specify you're sending a JSON body request and accepting JSON response
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
          body: formDataJsonString
      }).then((response)=> response.json())
      .then((data)=>{
        if(data.userId != 0){
          // console.log(data);
          // alert("Category added");
          $('#myModal').modal('hide');
          window.location.reload();
        }else{
          alert("Category already exists!")
        }
      })
      
  });
}

function categoryDetails(){
  var categories = document.querySelectorAll('.edit-button');
  categories.forEach(category=>{category.onclick = function(ev) {
    // ev.target <== td element
    // ev.target.parentElement <== tr
    var index = ev.target.parentElement;
    console.log(index);
    // var row = document.getElementById('data').children[index-1];
    // console.log(document.getElementById('data').children[index-1]);
    var categoryId = index.children[1].innerHTML;
    var categoryName = index.children[2].innerHTML;
    // console.log(categoryId);
    console.log(categoryId + " "+ categoryName);
    // // openDetailsForm();
    $('#detailModal').modal('show');
    var dtId = document.getElementById('dtid');
    var dtcategoryName = document.getElementById('dtcategoryName');
    dtId.value = categoryId;
    dtcategoryName.value = categoryName;
    }
})
}
function deleteCategory(){
  var categories = document.querySelectorAll('.delete-button');
  categories.forEach(category=>{category.onclick = function(ev) {
    var index = ev.target.parentElement;
    console.log(index);
    // var row = document.getElementById('data').children[index-1];
    // console.log(document.getElementById('data').children[index-1]);
    var id = index.children[1].innerHTML;
  // var id = document.getElementById('dtid').value;
  console.log(id);
  fetch(url+`${userId}/category/${id}`, {
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
          // closeDetailsForm();
          $('#detailModal').modal('hide');
          // getTransactions();
          window.location.reload();
        }
  })
  .catch(error=>{
    alert("Category is being used cannot delete")
  })
}})

}

function updateCategory(){
  const budgetForm = document.getElementById('edit-category-form');
  budgetForm.addEventListener('submit', (e)=>{
      e.preventDefault();

      const budgetData = new FormData(budgetForm);
      // const data = new URLSearchParams(formData);
      //Create an object from the form data entries
      let formDataObject = Object.fromEntries(budgetData.entries());
      let formDataJsonString = JSON.stringify(formDataObject);
      console.log(formDataJsonString);
      fetch(url+`${userId}/category/update`, {
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
          // alert("Budget added")
          // getAllbudget();
          $('#detailModal').modal('hide');
          window.location.reload();
          
          
        }else{
          alert("Not added ")
        }
      })
      // displayBudget(month,year);
  });
}
updateCategory()

addCategory();

showCategories();