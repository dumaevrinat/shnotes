package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.id.UUIDGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "notebooks")
public class Notebook implements Serializable {

    @PrePersist
    public void autofill() {
        if (id == null){
            this.setId(UUID.randomUUID());
        }
    }

    @Id
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "notebook", cascade = CascadeType.REMOVE)
    private Set<Note> notes;

    @OneToMany(mappedBy = "notebook", cascade = CascadeType.REMOVE)
    private Set<TaskList> taskLists;
}
