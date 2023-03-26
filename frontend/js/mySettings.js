

const pressedButtonSelector = '[data-theme][aria-pressed="true"]';
const defaultTheme = 'blue';

const applyTheme = (theme) => {
  const target = document.querySelector(`[data-theme="${theme}"]`);
  document.documentElement.setAttribute("data-selected-theme", theme);
  document.querySelector(pressedButtonSelector).setAttribute('aria-pressed', 'false');
  target.setAttribute('aria-pressed', 'true');
};

const handleThemeSelection = (event) => {
  const target = event.target;
  const isPressed = target.getAttribute('aria-pressed');
  const theme = target.getAttribute('data-theme');        
  console.log(isPressed);
  console.log(theme);
  if(isPressed !== "true") {
    applyTheme(theme);
    localStorage.setItem('selected-theme', theme);
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
  }
};

setInitialTheme();

const themeSwitcher = document.querySelector('#theme');
const buttons = themeSwitcher.querySelectorAll('button');

buttons.forEach((button) => {
   button.addEventListener('click', handleThemeSelection);
});


//category part*********************************************************************************

async function showCategories(){
  var formDataObject = {};
  var flag = true;
  formDataObject.month = currMonth;
  formDataObject.year = currYear;
  console.log(formDataObject);
  let formDataJsonString = JSON.stringify(formDataObject);
  await fetch(url+`${userId}/reminder/period`, {
  method:'POST', 
  headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
  },
  body: formDataJsonString
  }).then((response) => response.json())
  .then((data) => {
      var count = 0;
      
      console.log(data.length);
      // clg
      if(data.length !=0){
          var temp="";
          data.forEach((itemData) => {
              console.log(itemData);
              count=count+1;
              var recurringDate;
              var rd;
              
              // if(itemData.isRecurring){
              //     var d = new Date(formatDate(itemData.reminderDate)).getDate();
              //     console.log(d);
              //     var r = new Date(formatDate(itemData.reminderDate)).setMonth(currMonth-1);
              //     var d1 = new Date(r).getDate();
              //     console.log(d1);
              //     if(d <= d1 ){
              //      recurringDate = new Date(formatDate(itemData.reminderDate)).setMonth(currMonth-1);
              //      rd = new Date(recurringDate).toDateString();
              //     //  recurringDate.toLocaleString();
              //     // console.log(rd);
              //     }else{
              //         return;
              //     }
              // }else{
                  rd = itemData.reminderDate;
              // }
              temp += "<tr>";
              temp += "<td>" + count + "</td>";
              temp += "<td>" + itemData.billId + "</td>";
              temp += "<td>" + itemData.billName + "</td>";
              temp += "<td>" + rd + "</td>";
              temp += "<td>₹ " + itemData.billAmount + "</td>";
              // temp+= "<td><button>Edit</button></td>";
              // temp+= "<td><button>Delete</button></td>";
              temp += "</tr>";
              activeDates.push([itemData.billName,itemData.billAmount,formatDate(rd)]);
          });
          // document.getElementById('data').innerHTML = temp;
      }else{
          flag=false;
          var temp="";
          // temp = `<img src="assets/no-result-found.svg" class="img img-responsive result-img"/>`
          temp += `No Reminders`;
          // document.getElementsByClassName('r-jumbotron')[0].innerHTML = temp;
      }
      
      // calender();
      // if(flag){
          document.getElementById('data').innerHTML = temp;
      // }else{
      //     document.getElementsByClassName('r-jumbotron')[0].innerHTML = temp;
      // }
  })
  
  
}