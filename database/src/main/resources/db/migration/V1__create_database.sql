create table notebooks
(
    string_id varchar(255) not null,
    name varchar(255) not null,
    constraint string_id
        unique (string_id)
);

alter table notebooks
    add primary key (string_id);

create table notes
(
    id int auto_increment primary key,
    text blob null,
    is_done tinyint(1) not null,
    notebook_string_id varchar(255) not null,
    title varchar(255) null,
    is_high_priority tinyint(1) not null,
    constraint notes_ibfk_1
        foreign key (notebook_string_id) references notebooks (string_id)
            on delete cascade
);

create table task_lists
(
    id int auto_increment primary key,
    notebook_string_id varchar(255) not null,
    title varchar(255) null,
    is_high_priority tinyint(1) not null,
    constraint task_lists_ibfk_1
        foreign key (notebook_string_id) references notebooks (string_id)
            on delete cascade
);

create table tasks
(
    id int auto_increment primary key,
    task_list_id int not null,
    text blob null,
    is_done tinyint(1) not null,
    constraint tasks_ibfk_1
        foreign key (task_list_id) references task_lists (id)
            on delete cascade
);
