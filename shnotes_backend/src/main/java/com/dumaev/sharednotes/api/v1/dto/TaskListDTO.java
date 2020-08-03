package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
public class TaskListDTO {
    private UUID id;
    private String title;
    private Set<TaskDTO> tasks;
    private boolean isHighPriority;

    private UUID notebookId;
}
