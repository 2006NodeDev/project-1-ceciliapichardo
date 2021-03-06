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
		   
insert into users ("username", "password", "first_name", "last_name", "email", "city", "state", "country", "dog_name", "dog_sex", "breed", "role", "image")
	values ('cecilia', 'password', 'Cecilia', 'Pichardo', 'ceciliapichardo@gmail.com', 1, 5, 1, 'Chiquis', 1, 1, 1, '/Users/cecilia/Desktop/BelfastTrip.jpg'),
			('maddie', 'password', 'Maddie', 'Winslow', 'maddie@gmail.com', 2, 5, 1, 'Kobe', 2, 2, 2, '');

-- New Users
insert into users ("username", "password", "first_name", "last_name", "email", "city", "state", "dog_name", "breed", "role", "image")
	values ('ceci', 'pass', 'Cecilia', 'Pichardo', 'ceciliapichardo@gmail.com', 'Rialto', 'California', 'Nala', 'Cane Corso', 1, null),
			('maddie', 'password', 'Maddie', 'Winslow', 'maddie@gmail.com', 'Rancho Cucamonga', 'California', 'Kobe', 'Golden Retriever', 2, null);
		
select * from roles r;
select * from dog_breeds db;
select * from sex_of_dog sod;
select * from countries c;
select * from states s2;
select * from cities c;
select * from users u;

--Login 2
select u."user_id", 
	u."username", 
	u."password", 
	u."first_name", 
	u."last_name", 
	u."email",
	u."city",
	u."state",
	u."dog_name",
	u."breed",
	r."role_id", 
	r."role",
	u."image" from puppy_pals_site.users u
left join puppy_pals_site.roles r 
	on u."role" = r."role_id"
where u."username" = $1
	and u."password" = $2;

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
	r."role",
	u."image" from puppy_pals_site.users u
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

--New Find All Users
select u."user_id", 
	u."username", 
	u."password", 
	u."first_name", 
	u."last_name", 
	u."email",
	u."city",
	u."state",
	u."dog_name",
	u."breed",
	r."role_id", 
	r."role",
	u."image" from puppy_pals_site.users u
left join puppy_pals_site.roles r 
	on u."role" = r."role_id"
order by u.user_id;

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
	r."role",
	u."image" from puppy_pals_site.users u
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


--Create New User
select c."city_id" from puppy_pals_site.cities c where c."city" = $1; -- check if city exists
insert into puppy_pals_site.cities  ("city") values ($1) returning "city_id"; -- if not, insert it and return city_id
select s."state_id" from puppy_pals_site.states s where "state" = $1; -- select state_id from table
select sod."sex_id" from puppy_pals_site.sex_of_dog sod where sod."dog_sex" = $1; -- select sex_id from table
select db."breed_id" from puppy_pals_site.dog_breeds db where db."breed" = $1; -- check if breed exists
insert into puppy_pals_site.dog_breeds ("breed") values ($1) returning "breed_id"; -- if not, insert it and return breed_id
insert into puppy_pals_site.users ("username", "password", "first_name", "last_name", "email", "city", "state", "country", "dog_name", "dog_sex", "breed", "role", "image")
	values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning "user_id"; 
		-- Include: [username, password, firstName, lastName, email, cityId, stateId, countryId, dogName, sexId, breedId, roleId, image]

select c."city_id" from puppy_pals_site.cities c where c."city" = 'Upland'; -- check if city exists
insert into puppy_pals_site.cities  ("city") values ('Upland') returning "city_id"; -- if not, insert it and return city_id
select s."state_id" from puppy_pals_site.states s where "state" = 'California'; -- select state_id from table
select sod."sex_id" from puppy_pals_site.sex_of_dog sod where sod."dog_sex" = 'Female'; -- select sex_id from table
select db."breed_id" from puppy_pals_site.dog_breeds db where db."breed" = 'Beagle'; -- check if breed exists
insert into puppy_pals_site.dog_breeds ("breed") values ('Beagle') returning "breed_id"; -- if not, insert it and return breed_id
insert into puppy_pals_site.users ("username", "password", "first_name", "last_name", "email", "city", "state", "country", "dog_name", "dog_sex", "breed", "role", "image")
	values('elifox', 'password', 'Eli', 'Ward', 'eli@mail.com', 24, 5, 1, 'Lola', 1, 3, 2, '') returning "user_id";

--New Find User By Id
select u."user_id", 
	u."username", 
	u."password", 
	u."first_name", 
	u."last_name", 
	u."email",
	u."city",
	u."state",
	u."dog_name",
	u."breed",
	r."role_id", 
	r."role",
	u."image" from puppy_pals_site.users u
left join puppy_pals_site.roles r 
	on u."role" = r."role_id"
	where u."user_id" = $1;

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
	r."role",
	u."image" from puppy_pals_site.users u
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
update puppy_pals_site.users set "image" = $1 where "user_id" = $2;
	-- city
	--select c."city_id" from puppy_pals_site.cities c where c."city" = $1;
	update puppy_pals_site.users set "city" = $1 where "user_id" = $2;
	-- state
	--select s."state_id" from puppy_pals_site.states s where s."state" = $1;
	update puppy_pals_site.users set "state" = $1 where "user_id" = $2;
	-- dog sex
	--select sod."sex_id" from puppy_pals_site.sex_of_dog sod where sod."dog_sex" = $1;
	update puppy_pals_site.users set "dog_sex" = $1 where "user_id" = $2;
	-- breed
	--select db."breed_id" from puppy_pals_site.dog_breeds db where db."breed" = $1;
	update puppy_pals_site.users set "breed" = $1 where "user_id" = $2;

--Find users by city
select * from puppy_pals_site.users u where "city"='Rialto' and "state"= 'California';
select u."user_id", 
        u."username", 
        u."password", 
        u."first_name", 
        u."last_name", 
        u."email",
        u."city",
        u."state",
        u."dog_name",
        u."breed",
        r."role_id", 
        r."role",
        u."image" from puppy_pals_site.users u
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
    where "city"=$1 and "state"= $2
    order by u.user_id;
		

