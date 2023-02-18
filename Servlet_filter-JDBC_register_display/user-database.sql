create database servlet_filter;

use servlet_filter;

create table users(id int not null auto_increment,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(50) not null,
	password varchar(40) not null,
	primary key(id)
);

insert into users (first_name,last_name,email,password)
values ("vivek","raj","viv@gmail.com","12345fd"),
		("aftab","raja","a@gmail.com","67yu8guh"),
		("m s","dhoni","ms@gmail.com","dssffsfs"),
		("eliud","kipchoge","ek@gmail.com","12345fd");