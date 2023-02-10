create database company;

use company;

create table department(deptId int, 
	deptName varchar(30),
 	primary key(deptId));
 	
create table address(addrId int,
	address varchar(50),
	primary key (addrId));
	
create table employee(id int, 
	name varchar(30), 
	email varchar(30), 
	salary int,
	deptId int,
	addrId int,
	primary key (id),
	foreign key(deptId) references department(deptId),
	foreign key(addrId) references address(addrId)
);

insert into department(deptId, deptName)
values(1,"Accounts"),
	(2,"Human Resource"),
	(3,"IT"),
	(4, "Software Dev"),
	(5, "Support"),
    (6, "Finances");
    
insert into address (addrId , address)
values(1,"Hyderabad"),
	(2,"punjab"),
	(3,"patna"),
	(4, "bangalore");
	
insert into employee(id, name, email, salary,deptId,addrId) 
values(1, "vivek", "vivek@gmail.com", 100000,1,1)
	  ,(2, "Rakesh", "rakesh@gamil.com", 98000,1,2),
      (3, "aftab", "aftab@gmail.com", 66000,3,1),
      (4, "monika", "monika@gmail.com", 90350,4,3),
      (5, "aasma", "aasma@gmail.com", 110500,4,4),
      (6, "abdullah", "abdullah@gmail.com", 178000,2,4);
      
-- JOINS OPERATIONS
     
-- inner join returning all the employees with their addresses
select employee.name , address.address  
from employee 
inner join address on employee.addrId  = address.addrId ;

-- left join showing all the departments with the employees in that department
select  department.deptName,employee.name 
from department 
left join employee on employee.deptId  = department.deptId ;

-- right join showing only departments which are associated to an employee
select department.deptName,employee.name
from department 
right join employee on employee.deptId  = department.deptId ;