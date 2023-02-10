//array
var tasks = [{task:'running',remark:'done'},
{task:'breakfast',remark:'pending'},
{task:'feeding dog',remark:'done'},
{task:'Preparing presentation',remark:'done'},
{task:'Buying medicines',remark:'pending'},
{task:'Sending mail',remark:'pending'}];

//initially calling numOfTask to display total tasks in array
numOfTask();

//function to add task to the array
function addTask(){
    var new_task = document.getElementsByClassName('input-task')[0].value;
    if(new_task.trim() === ''){
        alert('Enter the task');
    }else{
        var ts1 = {task:new_task,remark:'pending'};
        tasks.push(ts1);
    }
    return numOfTask(); 
}

//function to get length of array and display in heading
function numOfTask(){
    var len = tasks.length;
    const add = document.getElementsByClassName('add')[0];
    const heading = add.getElementsByTagName('h1')[0];
    heading.innerHTML = "total " + len;
    return addList();
}

//function to calculate pending & completed tasks
//and change the number on every click
function pendinTask(){
    var len = tasks.length;
    const add = document.getElementsByClassName('add')[0];
    const p = add.getElementsByTagName('p')[0];
    const p1 = add.getElementsByTagName('p')[1];

    var pending_tasks = 0;
    tasks.forEach(element => {
        if(element.remark === 'pending'){
            pending_tasks ++;
        };
    
    });
    var completed_tasks = len - pending_tasks;
    // console.log(tasks); 
    p.innerHTML = "Pending " + pending_tasks;
    p1.innerHTML = "Completed " + completed_tasks;
}

//function to add tasks to the list in ul element
//and update the value of status of clicked task
function addList(){

    //calling this function to update the valued everytime a item is addednand clicked
    pendinTask();

    //code to append <li> everytime a task is added
    var list = document.getElementsByTagName('ul')[0];
    var ul = document.createElement('ul');
    list.replaceWith(ul);
    tasks.forEach(ele => {
        var li = document.createElement('li');
        var p = document.createElement('p');
        var img = document.createElement('img');
        img.src='../tick.png'
        if(ele.remark==='done'){
            li.classList.toggle('checked');
            // li.appendChild(img);
        }
        p.innerHTML=ele.task;
        li.appendChild(img);
        li.appendChild(p);
        ul.appendChild(li);
    });
    // console.log(tasks);

    //code to change the status of task whenever it is clicked
    ul.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            var li = ev.target.closest('li');
        //   ev.target.classList.toggle('checked');
          var nodes = Array.from( li.closest('ul').children );
          var index = nodes.indexOf(ev.target.closest('li'));
          if(tasks[index].remark==='pending'){
            tasks[index].remark='done';
          }else{
            tasks[index].remark='pending';
          }
        }
        
        addList();
      }, false);
    return false;
    
}
