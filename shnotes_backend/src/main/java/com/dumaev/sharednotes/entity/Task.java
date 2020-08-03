package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task {

    @PrePersist
    public void autofill() {
        if (id == null){
            this.setId(UUID.randomUUID());
        }
    }

    @Id
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_list_id", referencedColumnName = "id", nullable = false)
    private TaskList taskList;

    @Column(name = "text")
    private String text;

    @Column(name = "is_done", nullable = false)
    private boolean isDone;
}
