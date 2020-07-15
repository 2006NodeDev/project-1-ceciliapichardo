create schema puppy_pals_site;
set schema 'puppy_pals_site';

drop table roles cascade;
drop table dog_breeds cascade;
drop table sex_of_dog cascade;
drop table countries cascade;
drop table states cascade;
drop table cities cascade;
drop table users cascade;

create table roles ( /* list of roles: Admin/User */
	"role_id" serial primary key,
	"role" text
);

/* Dog Info */
create table dog_breeds ( /* list of Dog breeds */
	"breed_id" serial primary key,
	"breed" text
);

create table sex_of_dog (
	"sex_id" serial primary key,
	"dog_sex" text
);

/* Where users are from */
create table countries ( /* list of countries, probably gonna start as just 1 */
	"country_id" serial primary key,
	"country" text 
);

create table states ( /* list of states */
	"state_id" serial primary key,
	"state" text
);

create table cities ( /* list of cities */
	"city_id" serial primary key,
	"city" text
);

/* User Info */
create table users (
	"user_id" serial primary key,
	"username" text not null unique,
	"password" text not null,
	"first_name" text not null,
	"last_name" text not null,
	"email" text not null,
	"city" int references cities ("city_id"), --foreign key to cities table
	"state" int references states ("state_id"), --foreign key to states table
	"country" int references countries ("country_id"), --foreign key to countries table
	"dog_name" text not null,
	"dog_sex" int references sex_of_dog ("sex_id"), --foreign key to sex_of_dog table
	"breed" int references dog_breeds ("breed_id"), --foreign key to dog_breeds table
	"role" int references roles ("role_id") --foreign key to roles table
);