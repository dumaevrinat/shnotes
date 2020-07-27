package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "notebooks")
public class Notebook implements Serializable {

    @Id
    @Column(name = "string_id", unique = true, nullable = false)
    private String stringId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "notebook", cascade = CascadeType.REMOVE)
    private Set<Note> notes;

    @OneToMany(mappedBy = "notebook", cascade = CascadeType.REMOVE)
    private Set<TaskList> taskLists;
}
