create database insurance2;

use insurance2;
-- done
create table user_role(id int not null auto_increment,
	role_name varchar(20) not null unique,
	primary key(id)
);
-- done
create table relations(id int not null auto_increment,
	relation_name varchar(20) not null unique,
	primary key(id)
);
-- done
create table companies(id int not null auto_increment,
	company_name varchar(20) not null unique,
	primary key(id)
);
-- done
create table top_ups(id int not null auto_increment,
	topup_amount int not null unique,
	monthly_deduction int not null unique,
	description varchar(250),
	primary key(id)
);
-- done
create table gpap_nominee(id int not null auto_increment,
	nominee_name varchar(20) not null ,
	nominee_dob date not null,
	relation_id int not null,
	primary key(id),
	foreign key(relation_id) references relations(id)
);

-- done
create table gender(id int not null auto_increment,
	gender_name varchar(20) not null unique,
	primary key(id)
);

-- done
create table marital_status(id int not null auto_increment,
	status varchar(20) not null unique,
	primary key(id)
);

-- done
create table users(id int not null auto_increment,
	user_name varchar(20) not null,
	emp_id int not null unique,
	dob date not null,
	location varchar(255),
	image varchar(255),
	email varchar(100) not null unique,
	password varchar(20) not null,
	blood_group varchar(10),
	phone_no varchar(20) not null unique,
	marital_status int not null,
	gender int not null,
	gpap_id int not null,
	role_id int not null,
	primary key(id),
	foreign key(marital_status) references marital_status(id),
	foreign key(gender) references gender(id),
	foreign key(gpap_id) references gpap_nominee(id),
	foreign key(role_id) references user_role(id)
);

-- done
create table dependents(id int not null auto_increment,
	user_id int,
	dependent_name varchar(100) not null,
	dependent_dob date not null,
	relation_id int not null,
	primary key(id),
	foreign key(relation_id) references relations(id),
	foreign key(user_id) references users(id)
);

-- done
create table cycles(id int not null auto_increment,
	start_year int not null unique,
	end_year int not null unique,
	edit_permission varchar(10) not null,
	company_id int not null,
	primary key(id),
	foreign key(company_id) references companies(id)
);

-- done
create table cycle_topup(id int not null auto_increment,
	topup_id int not null,
	cycle_id int not null,
	primary key(id),
	foreign key(topup_id) references top_ups(id),
	foreign key(cycle_id) references cycles(id)
);

-- alter table cycles drop column topup_id;

-- done
create table user_cycle(id int not null auto_increment,
	user_id int not null,
	cycle_id int not null,
	hasOpted boolean not null,
	primary key(id),
	foreign key(user_id) references users(id),
	foreign key(cycle_id) references cycles(id)
);

-- alter table user_cycle add column hasOpted boolean not null;


