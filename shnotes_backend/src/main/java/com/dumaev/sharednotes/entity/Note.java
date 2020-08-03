package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@ToString
@Entity
@Table(name = "notes")
public class Note {

    @PrePersist
    public void autofill() {
        if (id == null){
            this.setId(UUID.randomUUID());
        }
    }

    @Id
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private  String text;

    @Column(name = "is_high_priority", nullable = false)
    private boolean isHighPriority;

    @Column(name = "is_done", nullable = false)
    private boolean isDone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notebook_id", referencedColumnName = "id", nullable = false)
    private Notebook notebook;
}
