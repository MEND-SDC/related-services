DROP DATABASE related;

CREATE DATABASE related;

\c "related"

CREATE TABLE regions (
    region_id serial PRIMARY KEY,
    name varchar (50) not null
);

CREATE TABLE homes (
    home_id serial PRIMARY KEY,
    address varchar (50) not null,
    rating int not null,
    price int not null,
    owner varchar (50) not null,
    region_id integer not null,
    CONSTRAINT homes_region_id_fkey FOREIGN KEY (region_id)
        REFERENCES regions (region_id)
);

CREATE TABLE photos (
    photo_id serial PRIMARY KEY,
    url varchar (100) not null,
    home_id integer not null,
    CONSTRAINT photos_home_id_fkey FOREIGN KEY (home_id)
        REFERENCES homes (home_id) 
);