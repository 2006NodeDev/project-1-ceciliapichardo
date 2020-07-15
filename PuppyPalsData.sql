set schema 'puppy_pals_site';

insert into roles ("role")
	values ('Admin'),
		   ('User');
		   
insert into dog_breeds ("breed")
	values ('Chihuahua'),
		   ('Golden Retriever');
		   
insert into sex_of_dog ("dog_sex")
	values ('Female'),
		   ('Male');
		   
insert into countries ("country")
	values ('USA');
	
insert into states ("state")
	values ('Alabama'),
			('Alaska'),
			('Arizona'),
			('Arkansas'),
			('California'),
			('Colorado'),
			('Connecticut'),
			('Delaware'),
			('Florida'),
			('Georgia'),
			('Hawaii'),
			('Idaho'),
			('Illinois'),
			('Indiana'),
			('Iowa'),
			('Kansas'),
			('Kentucky'),
			('Louisiana'),
			('Maine'),
			('Maryland'),
			('Massachusetts'),
			('Michigan'),
			('Minnesota'),
			('Mississippi'),
			('Missouri'),
			('Montana'),
			('Nebraska'),
			('Nevada'),
			('New Hampshire'),
			('New Jersey'),
			('New Mexico'),
			('New York'),
			('North Carolina'),
			('North Dakota'),
			('Ohio'),
			('Oklahoma'),
			('Oregon'),
			('Pennsylvania'),
			('Rhode Island'),
			('South Carolina'),
			('South Dakota'),
			('Tennessee'),
			('Texas'),
			('Utah'),
			('Vermont'),
			('Virginia'),
			('Washington'),
			('West Virginia'),
			('Wisconsin'),
			('Wyoming');

insert into cities ("city")
	values ('Rialto'),
		   ('Rancho Cucamonga');
		   
insert into users ("username", "password", "first_name", "last_name", "email", "city", "state", "country", "dog_name", "dog_sex", "breed", "role")
	values ('cecilia', 'password', 'Cecilia', 'Pichardo', 'ceciliapichardo@gmail.com', 1, 5, 1, 'Chiquis', 1, 1, 1),
			('maddie', 'password', 'Maddie', 'Winslow', 'maddie@gmail.com', 2, 5, 1, 'Kobe', 2, 2, 2);
		
select * from roles r;
select * from dog_breeds db;
select * from sex_of_dog sod;
select * from countries c;
select * from states s2;
select * from cities c;
select * from users u;

--Login
select u."user_id", 
	u."username", 
	u."password", 
	u."first_name", 
	u."last_name", 
	u."email",
	c."city_id",
	c."city",
	s."state_id",
	s."state",
	c2."country_id",
	c2."country",
	u."dog_name",
	sod."sex_id",
	sod."dog_sex",
	db."breed_id",
	db."breed",
	r."role_id", 
	r."role" from puppy_pals_site.users u
left join puppy_pals_site.sex_of_dog sod 
	on u."dog_sex" = sod."sex_id"
left join puppy_pals_site.dog_breeds db
	on u."breed" = db."breed_id"
left join puppy_pals_site.roles r 
	on u."role" = r."role_id"
left join puppy_pals_site.cities c
	on u."city" = c."city_id"
left join puppy_pals_site.states s
	on u."state" = s."state_id"
left join puppy_pals_site.countries c2
	on u."country" = c2."country_id"
where u."username" = $1 
	and u."password" = $2;


--Find All Users
select u."user_id", 
	u."username", 
	u."password", 
	u."first_name", 
	u."last_name", 
	u."email",
	c."city_id",
	c."city",
	s."state_id",
	s."state",
	c2."country_id",
	c2."country",
	u."dog_name",
	sod."sex_id",
	sod."dog_sex",
	db."breed_id",
	db."breed",
	r."role_id", 
	r."role" from puppy_pals_site.users u
left join puppy_pals_site.sex_of_dog sod 
	on u."dog_sex" = sod."sex_id"
left join puppy_pals_site.dog_breeds db
	on u."breed" = db."breed_id"
left join puppy_pals_site.roles r 
	on u."role" = r."role_id"
left join puppy_pals_site.cities c
	on u."city" = c."city_id"
left join puppy_pals_site.states s
	on u."state" = s."state_id"
left join puppy_pals_site.countries c2
	on u."country" = c2."country_id"
order by u.user_id;


--create new city & select ID
insert into puppy_pals_site.cities ("city") values ($1);
select c."city_id" from puppy_pals_site.cities c where c."city" = $2;
--find sex_id from dog_sex
select sod."sex_id" from puppy_pals_site.sex_of_dog sod where sod."dog_sex" = $1;
--create new breed & select ID
insert into puppy_pals_site.cities ("breed") values ($1);
select db."breed_id" from puppy_pals_site.dog_breeds db r where db."breed" = $1;
--find state_id from state
select s."state_id" from puppy_pals_site.states s where s."state" = $1;

--Create New User
insert into puppy_pals_site.users ("username", "password", "first_name", "last_name", "email", "city", "state", "country", "dog_name", "dog_sex", "breed", "role")
	values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning "user_id";

--Find User By Id
select u."user_id", 
	u."username", 
	u."password", 
	u."first_name", 
	u."last_name", 
	u."email",
	c."city_id",
	c."city",
	s."state_id",
	s."state",
	c2."country_id",
	c2."country",
	u."dog_name",
	sod."sex_id",
	sod."dog_sex",
	db."breed_id",
	db."breed",
	r."role_id", 
	r."role" from puppy_pals_site.users u
left join puppy_pals_site.sex_of_dog sod 
	on u."dog_sex" = sod."sex_id"
left join puppy_pals_site.dog_breeds db
	on u."breed" = db."breed_id"
left join puppy_pals_site.roles r 
	on u."role" = r."role_id"
left join puppy_pals_site.cities c
	on u."city" = c."city_id"
left join puppy_pals_site.states s
	on u."state" = s."state_id"
left join puppy_pals_site.countries c2
	on u."country" = c2."country_id"
	where u."user_id" = $1;

--Update User Info
update puppy_pals_site.users set "username" = $1 where "user_id" = $2;
update puppy_pals_site.users set "password" = $1 where "user_id" = $2;
update puppy_pals_site.users set "first_name" = $1 where "user_id" = $2;
update puppy_pals_site.users set "last_name" = $1 where "user_id" = $2;
update puppy_pals_site.users set "email" = $1 where "user_id" = $2;
update puppy_pals_site.users set "dog_name" = $1 where "user_id" = $2;
	-- city
	select c."city_id" from puppy_pals_site.cities c where c."city" = $1;
	update puppy_pals_site.users set "city" = $1 where "user_id" = $2;
	-- state
	select s."state_id" from puppy_pals_site.states s where s."state" = $1;
	update puppy_pals_site.users set "state" = $1 where "user_id" = $2;
	-- dog sex
	select sod."sex_id" from puppy_pals_site.sex_of_dog sod where sod."dog_sex" = $1;
	update puppy_pals_site.users set "dog_sex" = $1 where "user_id" = $2;
	-- breed
	select db."breed_id" from puppy_pals_site.dog_breeds db where db."breed" = $1;
	update puppy_pals_site.users set "breed" = $1 where "user_id" = $2;

		

