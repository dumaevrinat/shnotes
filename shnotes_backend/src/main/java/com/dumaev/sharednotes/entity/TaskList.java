package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "task_lists")
public class TaskList {

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
    @JoinColumn(name = "notebook_id", referencedColumnName = "id", nullable = false)
    private Notebook notebook;

    @Column(name = "title")
    private String title;

    @Column(name = "is_high_priority", nullable = false)
    private boolean isHighPriority;

    @OneToMany(mappedBy = "taskList", cascade = CascadeType.REMOVE)
    private Set<Task> tasks;
}
