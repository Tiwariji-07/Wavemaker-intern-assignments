insert into user_role(id,role_name)
values(1,'admin'),(2,'employee');

insert into gender(id,gender_name)
values(1,'male'),(2,'female'),(3,'others');

insert into relations(id,relation_name)
values(1,'parent'),(2,'inlaw'),(3,'spouse'),(4,'child');

insert into companies(id,company_name)
values(1,'abc'),(2,'def'),(3,'ghi'),(4,'jkl'),(5,'mno');

insert into marital_status (id,status)
values(1,'married'),(2,'unmarried');

insert into gpap_nominee (id,nominee_name,nominee_dob,relation_id)
values(1,'john','1999-12-11',1),(2,'viv','1990-12-11',3),(3,'john','1999-12-11',1),(4,'raj','1995-12-11',2);

insert into top_ups(id,topup_amount ,monthly_deduction ,description)
values(1,50000,1000,'gjhgsjgigifabbaissfbsfsfdsifs'),
	(2,75000,1200,'gjhgsjgigifabbaissfbsfsfdsifs'),
	(3,100000,1800,'gjhgsjgigifabbaissfbsfsfdsifs'),
	(4,150000,2100,'gjhgsjgigifabbaissfbsfsfdsifs');

insert into cycles(id,start_year ,end_year ,edit_permission,company_id)
	values(1,2015,2016,'yes',1),
	(2,2016,2017,'yes',3),
	(3,2017,2018,'no',1),
	(4,2018,2019,'no',2),
	(5,2019,2020,'yes',5);

insert into cycle_topup (id,topup_id,cycle_id)
	values (1,1,1),(2,1,3),(3,2,1),(4,2,5),(5,2,3),(6,4,1);

insert into users(id,user_name,emp_id,email,
	password,location,dob,image,blood_group,
	phone_no,gender,gpap_id,marital_status,opt_in,role_id)
	values (1,'vivek',11980,'vivek@email.com','1234','hyderabad','2001-01-01','pic/img.png','o+','1234567890',1,2,1,'yes',1),
	(2,'ajay',11480,'ajay@email.com','1234','hyderabad','2001-05-01','pic/img1.png','b+','1234567890',1,1,1,'no',2),
	(3,'sneha',11950,'sneha@email.com','1234','hyderabad','2001-07-01','pic/img2.png','ab+','8888888999',2,4,2,'yes',2),
	(4,'aakash',11987,'aakash@email.com','1234','hyderabad','2001-10-01','pic/img3.png','o+','1234567890',1,3,1,'yes',2),
	(5,'mohd',11985,'mohd@email.com','1234','hyderabad','2003-01-01','pic/img4.png','ab-','1234567890',1,2,2,'no',2),
	(6,'divya',1199,'divya@email.com','1234','hyderabad','2001-01-08','pic/img5.png','o+','1234567890',2,1,1,'yes',1);


insert into user_cycle (id,user_id ,cycle_id)
	values (1,1,1),(2,1,3),(3,2,1),(4,2,5),(5,2,3),(6,4,1);


insert into dependents (id,dependent_name ,dependent_dob ,relation_id,user_id)
values(1,'john','1999-12-11',1,1),(2,'viv','1990-12-11',3,2),(3,'john','1999-12-11',1,2),(4,'raj','1995-12-11',2,4);


