create database library;

use library;


create table book(
	book_id int not null auto_increment,
	book_title varchar(100) not null unique,
	book_author varchar(50) not null,
	primary key(book_id)
);

insert into book(book_id,book_title,book_author)
values (1,"consequuntur","Mrs. Susana Farrell"),
		(2,"quis","Anais Trantow"),
		(3,"ipsa","Dejah Wolff"),
		(4,"expedita","Leopoldo Hackett"),
		(5,"officiis","Mrs. Susana Farrell")
;


select * from book;

select * from book 
where book_id = 2;

delete from book
where book_id = 5;

update book 
set book_title = "abcd"
where book_id =2;


insert into book(book_id,book_title,book_author)
values (6,"gjfgeb","Mrs. Susana Farrell");