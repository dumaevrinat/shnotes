package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class TaskListDTO {
    private Long id;
    private String title;
    private Set<TaskDTO> tasks;
    private boolean isHighPriority;

    private String notebookId;
}
