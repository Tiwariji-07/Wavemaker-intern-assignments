use insurance;

create table user_role(id int not null auto_increment,
	role_name varchar(20),
	primary key(id)
);

create table relations(id int not null auto_increment,
	relation_name varchar(20),
	primary key(id)
);

create table companies(id int not null auto_increment,
	company_name varchar(20),
	primary key(id)
);

create table top_ups(id int not null auto_increment,
	topup_amount int,
	monthly_deduction int,
	description varchar(250),
	primary key(id)
);

create table gpap_nominee(id int not null auto_increment,
	nominee_name varchar(20),
	nominee_dob date,
	relation_id int,
	primary key(id),
	foreign key(relation_id) references relations(id)
);


create table gender(id int not null auto_increment,
	gender_name varchar(20),
	primary key(id)
);

create table marital_status(id int not null auto_increment,
	status varchar(20),
	primary key(id)
);


create table users(id int not null auto_increment,
	user_name varchar(20),
	emp_id int,
	dob date,
	location varchar(255),
	image varchar(255),
	email varchar(100),
	password varchar(20),
	blood_group varchar(10),
	phone_no varchar(20),
	marital_status int,
	gender int,
	opt_in varchar(10),
	gpap_id int,
	role_id int,
	primary key(id),
	foreign key(marital_status) references marital_status(id),
	foreign key(gender) references gender(id),
	foreign key(gpap_id) references gpap_nominee(id),
	foreign key(role_id) references user_role(id)
);

create table dependents(id int not null auto_increment,
	user_id int,
	dependent_name varchar(100),
	dependent_dob date,
	relation_id int,
	primary key(id),
	foreign key(relation_id) references relations(id),
	foreign key(user_id) references users(id)
);


create table cycles(id int not null auto_increment,
	start_year int,
	end_year int,
	edit_permission varchar(10),
	company_id int,
	primary key(id),
	foreign key(company_id) references companies(id)
);

create table cycle_topup(id int not null auto_increment,
	topup_id int,
	cycle_id int,
	primary key(id),
	foreign key(topup_id) references top_ups(id),
	foreign key(cycle_id) references cycles(id)
);

-- alter table cycles drop column topup_id;


create table user_cycle(id int not null auto_increment,
	user_id int,
	cycle_id int,
	primary key(id),
	foreign key(user_id) references users(id),
	foreign key(cycle_id) references cycles(id)
);


