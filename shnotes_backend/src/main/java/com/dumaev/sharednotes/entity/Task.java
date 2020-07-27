package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_list_id", referencedColumnName = "id", nullable = false)
    private TaskList taskList;

    @Column(name = "text")
    private String text;

    @Column(name = "is_done", nullable = false)
    private boolean isDone;
}
