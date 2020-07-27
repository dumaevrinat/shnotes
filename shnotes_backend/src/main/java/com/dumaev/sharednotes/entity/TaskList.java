package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "task_lists")
public class TaskList {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notebook_string_id", referencedColumnName = "string_id", nullable = false)
    private Notebook notebook;

    @Column(name = "title")
    private String title;

    @Column(name = "is_high_priority", nullable = false)
    private boolean isHighPriority;

    @OneToMany(mappedBy = "taskList", cascade = CascadeType.REMOVE)
    private Set<Task> tasks;
}
