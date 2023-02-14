

insert into cuisine (cuisine_name)
	values ('indian'),
	('chinese'),('south-indian'),('korean'),('afghani');
-- -------------

insert into coupon  (coupon_name,amount_deducted)
	values ('new60',60),('freedom120',120),('val45',45);
	
-- ----------------

insert into delivery_driver(driver_name,contact_no)
	values ('vivek',123456789),('xyc',547382467),('guguw',648342678),
	('uwfus',857523198),('afgfdwfuegeuhani',986432167);
	
-- -----------

insert into customer (customer_name ,customer_gender,email,contact_no)
	values ('aftab','male','a@gmail.com',123434789),
	('dgs','female','d@gmail.com',523382467),
	('ugfjgf','male','u@gmail.com',612342678),
	('vd','male','v@gmail.com',648328645),
	('gcj','female','gc@mail.com',43625346);
	
-- ---------

insert into address (street_no ,address_line1 ,address_line2 ,city,state,country,pincode)
	values (1,'gjvdjw','','lothkunta','ts','india',500015),
	(3,'ggejh','alwal','hyderabad','ts','india',50035),
	(423,'gge','','bangalore','ka','india',500719),
	(99,'gjvdjw','','hyderabad','ts','india',500017),
	(1,'ooio','lothkunta','hyderabad','ts','india',500030);
	
-- -------------------

insert into customer_address (customer_id,address_id)
values (11,6),(12,8),(11,7),(13,8),(14,10);
-- --------------------

insert into restaurant  (restaurant_name,address_id)
values ("Star Bucks",9),('Family dhaba',8),('KFC',9),('mcCafe',6),('karachi',10);
-- ---------------------

insert into  menu_item  (restaurant_id,item_name ,item_price)
values (1,"coffee",80),
	(1,"cake",400),
	(2,"biryani",120),
	(1,"donut",80),
	(4,"chicken",80),
	(5,"pizza",399),
	(4,"coffee",80);
-- ---------------------

insert into restaurant_cuisine  (restaurant_id,cuisine_id)
values (1,1),(2,3),(1,2),(3,3),(4,5),(2,5);
-- --------------------

insert into food_order(customer_id,restaurant_id,delivery_driver_id,coupon_id,customer_address_id,order_date_time,delivery_fee,
		tax_amount,total_amount,order_status,cust_restaurant_rating,cust_driver_rating)
values (11,1,1,1,11,CAST(N'2012-06-18 10:34:09.000' AS DateTime),46,7,253,'pending',4,4),
		(11,3,2,2,11,CAST(N'2012-06-19 11:34:09.000' AS DateTime),30,7,253,'delivered',5,4),
		(13,1,4,1,11,CAST(N'2012-06-19 12:34:09.000' AS DateTime),46,7,253,'picked',4,4),
		(15,3,5,3,11,CAST(N'2012-06-20 9:34:09.000' AS DateTime),23,7,253,'pending',3,4),
		(11,5,1,1,11,CAST(N'2012-06-20 10:34:09.000' AS DateTime),46,7,253,'delivered',4,2);
-- --------------------------
	
insert into order_menu_item (order_id,menu_item_id,quantity)
values (7,1,2),(6,1,1),(8,2,4);