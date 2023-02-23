insert into user(user_id,first_name,last_name,email,phone_no,age,gender,password)
	values(1,"vivek","raj","v@email.com",862846696,21,"male","vivek"),
	(2,"ashok","singh","a@email.com",765588768,21,"male","hghgg"),
	(3,"praneeth","tiwari","p@email.com",5755868,21,"male","ggjgj");
	
insert into station (station_id,station_name)
	values(1,"gaya"),
	(2,"allahabad"),
	(3,"patna"),(4,"secunderabad");
	
insert into train( train_id,train_name,no_of_seats ,source_id ,destination_id )
	values (1,"sc-patna",300,4,3),
	(2,"al-gy",400,2,1);
	
insert into train_station (train_station,train_no,station_no,halt_status,arrival_time)
	values(1,1,2,"yes",CAST(N'2012-06-18 10:34:09.000' AS DateTime)),
	(2,2,3,"yes",CAST(N'2012-06-18 11:34:09.000' AS DateTime));
	
insert into ticket (ticket_id,user_id,train_id,status,travel_date,source_id,destination_id,fare_amount)
	values (1,1,1,"booked",CAST(N'2012-06-18 10:34:09.000' AS DateTime),4,3,765),
	(2,1,1,"booked",CAST(N'2012-06-18 10:34:09.000' AS DateTime),4,2,600);
	
insert into passenger (passenger_id,name,age,gender,reservation_status,pnr_no,user_id,ticket_id)
	values(1,"vivek",21,"male","CNF",576761,1,1),
	(2,"priya",20,"female","RAC",576761,1,1),
	(3,"aakash",21,"male","CNF",576762,2,2);
	
