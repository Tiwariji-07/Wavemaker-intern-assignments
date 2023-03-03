insert into user(id,first_name,last_name,email,password,gender,dob,occupation)
values (2,"vivek","raj","v@gmail.com","vivek","male",'2001-08-13',"student");

insert into transaction_type (id,transaction_type_name)
values (1,"income"),(2,"expense");

insert into category(id,category_name,user_id)
values (1,"food",2),(2,"cloth",2),(3,"fuel",2),(4,"shopping",3),(5,"entertainment",3),(6,"personal",3),(7,"health",3);

insert into bill_reminder (id,user_id ,bill_name,reminder_date,bill_amount,is_recurring,is_active,description)
values (1,2,"Bike Emi",'2023-03-10',2000,true,true,"My bike emi."),
		(2,2,"Tv Emi",'2023-03-15',1100,true,true,"My Tv emi."),
		(3,2,"Car Emi",'2023-03-10',25000,true,false,"My Car emi."),
		(4,2,"Netflix",'2023-03-16',200,true,true,"Netflix subscription");
	
insert into expense_budget (id,user_id ,category_id ,budget_limit,spent_amount  ,budget_month ,budget_year ,is_recurring,is_active)
values (1,2,1,500,0,03,2023,false,true),
		(2,2,2,1000,200,03,2023,false,true),
	(3,2,3,500,0,03,2023,false,true);

insert into transactions (id,user_id,category_id,transaction_type_id,transaction_month,transaction_year,debit_amount,credit_amount,description)
values (1,2,2,2,03,2023,200,0,"bought jeans"),
(2,2,null,1,03,2023,0,1000,"received rent");
		