package com.dumaev.sharednotes.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "notes")
public class Note {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private  String text;

    @Column(name = "is_high_priority", nullable = false)
    private boolean isHighPriority;

    @Column(name = "is_done", nullable = false)
    private boolean isDone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notebook_string_id", referencedColumnName = "string_id", nullable = false)
    private Notebook notebook;
}
