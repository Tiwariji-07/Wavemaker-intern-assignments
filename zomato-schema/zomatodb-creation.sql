create database zomatodatabase;

use zomatodatabase;

create table cuisine(id int not null auto_increment,
	cuisine_name varchar(30) not null unique,
	primary key(id)
);
-- 

create table coupon(id int not null auto_increment,
	coupon_name varchar(20) not null unique,
	amount_deducted int not null,
	primary key(id)
);

-- 

create table delivery_driver(id int not null auto_increment,
	driver_name varchar(20) not null unique,
	contact_no int not null unique,
	primary key(id)
);
-- 

create table customer(id int not null auto_increment,
	customer_name varchar(20) not null unique,
	customer_gender varchar(10),
	email varchar(20) not null unique,
	contact_no int not null unique,
	primary key(id)
);
-- ----------

create table address(id int not null auto_increment,
	street_no int not null,
	address_line1 varchar(50) not null,
	address_line2 varchar(50),
	city varchar(50) not null,
	state varchar(50) not null,
	country varchar(50) not null,
	pincode int not null unique,
	primary key(id)
);
-- ----------------------------

create table customer_address(id int not null auto_increment,
	customer_id int not null,
	address_id int not null,
	primary key(id),
	foreign key(customer_id) references customer(id),
	foreign key(address_id) references address(id)
);
-- ------------------

create table restaurant(id int not null auto_increment,
	restaurant_name varchar(50) not null,
	address_id int not null,
	primary key(id),
	foreign key(address_id) references address(id)
);
-- -----------------------


create table menu_item(id int not null auto_increment,
	restaurant_id int not null,
	item_name varchar(30) not null,
	item_price int not null,
	primary key(id),
	foreign key(restaurant_id) references restaurant(id)
);
-- ---------------------------

create table food_order(id int not null auto_increment,
	customer_id int not null,
	restaurant_id int not null,
	delivery_driver_id int not null,
	coupon_id int not null,
	customer_address_id int not null,
	order_date_time datetime not null,
	delivery_fee int not null,
	tax_amount int not null,
	total_amount int not null,
	order_status varchar(20) not null,
	cust_driver_rating int ,
	cust_restaurant_rating int,
	primary key(id),
	foreign key(restaurant_id) references restaurant(id),
	foreign key(customer_id) references customer(id),
	foreign key(delivery_driver_id) references delivery_driver(id),
	foreign key(coupon_id) references coupon(id),
	foreign key(customer_address_id) references customer_address(id)
);
-- ------------

create table restaurant_cuisine(id int not null auto_increment,
	cuisine_id int not null,
	restaurant_id int not null,
	primary key(id),
	foreign key(cuisine_id) references cuisine(id),
	foreign key(restaurant_id) references restaurant(id)
);
-- ------------------------

create table order_menu_item(id int not null auto_increment,
	order_id int not null,
	menu_item_id int not null,
	quantity int not null,
	primary key(id),
	foreign key(order_id) references food_order(id),
	foreign key(menu_item_id) references menu_item(id)
);

