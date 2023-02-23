create database spring_railway;

use spring_railway;

create table user(user_id int not null auto_increment,
	first_name varchar(100),
	last_name varchar(100),
	email varchar(50) not null unique,
	phone_no int not null unique,
	age int,
	gender varchar(20),
	password varchar(100),
	primary key(user_id)
);

create table station(station_id int not null auto_increment,
	station_name varchar(100) unique,
	primary key(station_id)
);



create table train(train_id int not null auto_increment,
	train_name varchar(100) unique,
	no_of_seats int,
	source_id int not null,
	destination_id int not null,
	primary key(train_id),
	foreign key(source_id) references station(station_id),
	foreign key(destination_id) references station(station_id)
);
-- drop table train;

create table train_station(train_station int not null auto_increment,
	train_no int not null,
	station_no int not null,
	halt_status varchar(20),
	arrival_time datetime,
	primary key(train_station),
	foreign key(train_no) references train(train_id),
	foreign key(station_no) references station(station_id)
);
-- drop table train_station;


create table ticket(ticket_id int not null auto_increment,
	user_id int,
	status varchar(20),
	train_id int not null,
	travel_date datetime not null,
	source_id int not null,
	destination_id int not null,
	fare_amount int not null,
	primary key(ticket_id),
	foreign key(train_id) references train(train_id),
	foreign key(source_id) references station(station_id),
	foreign key(destination_id) references station(station_id),
	foreign key(user_id) references user(user_id)
);

create table passenger(passenger_id int not null auto_increment,
	pnr_no int not null,
	user_id int not null,
	ticket_id int not null,
	name varchar(20),
	age int,
	gender varchar(20),
	reservation_status varchar(20),
	primary key(passenger_id),
	foreign key(user_id) references user(user_id),
	foreign key(ticket_id) references ticket(ticket_id)
);
