create table notebooks (
    id int primary key auto_increment,
    string_id varchar(255) not null unique,
    name varchar(255) not null
);

create table notes (
    id int primary key auto_increment,
    text blob,
    title varchar(255),
    is_done boolean not null,
    notebook_string_id varchar(255) not null,

    foreign key (notebook_string_id) references notebooks(string_id)
)