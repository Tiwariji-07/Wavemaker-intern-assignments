create database finwise;

use finwise;

create table transaction_type(id int not null auto_increment,
	transaction_type_name varchar(20) not null,
	primary key(id)
);

-- drop table category ;
create table category(id int not null auto_increment,
	user_id int,
	category_name varchar(50) not null,
	primary key(id),
	foreign key(user_id) references user(id)
);



create table user(id int not null auto_increment,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(50) not null unique,
	password varchar(50) not null,
	gender varchar(10),
	dob date,
	occupation varchar(50),
	primary key(id)
);


create table bill_reminder(id int not null auto_increment,
	user_id int not null,
	bill_name varchar(50) not null,
	reminder_date date,
	bill_amount float,
	is_recurring boolean not null,
	is_active boolean not null,
	description varchar(200),
	primary key(id),
	foreign key(user_id) references user(id)
); 

-- drop table transactions ;
create table transactions(id int not null auto_increment,
	user_id int not null,
	category_id int,
	transaction_type_id int not null,
	transaction_month int not null,
	transaction_year int not null,
	debit_amount float,
	credit_amount float,
	description varchar(200),
	primary key(id),
	foreign key(user_id) references user(id),
	foreign key(category_id) references category(id),
	foreign key(transaction_type_id) references transaction_type(id)
); 

-- drop table expense_budget ;
create table expense_budget(id int not null auto_increment,
	user_id int not null,
	category_id int not null,
	budget_limit float,
	spent_amount float,
	budget_month int not null,
	budget_year int not null,
	is_recurring boolean not null,
	is_active boolean not null,
	primary key(id),
	foreign key(category_id) references category(id),
	foreign key(user_id) references user(id)
); 



