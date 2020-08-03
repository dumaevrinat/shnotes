create table notebooks
(
    id binary(16) not null primary key,
    name varchar(255) not null
);

create table notes
(
    id binary(16) not null primary key,
    text blob null,
    is_done tinyint(1) not null,
    notebook_id binary(16) not null,
    title varchar(255) null,
    is_high_priority tinyint(1) not null,
    constraint notes_ibfk_1
        foreign key (notebook_id) references notebooks (id)
            on delete cascade
);

create table task_lists
(
    id binary(16) not null primary key,
    notebook_id binary(16) not null,
    title varchar(255) null,
    is_high_priority tinyint(1) not null,
    constraint task_lists_ibfk_1
        foreign key (notebook_id) references notebooks (id)
            on delete cascade
);

create table tasks
(
    id binary(16) not null primary key,
    task_list_id binary(16) not null,
    text blob null,
    is_done tinyint(1) not null,
    constraint tasks_ibfk_1
        foreign key (task_list_id) references task_lists (id)
            on delete cascade
);
