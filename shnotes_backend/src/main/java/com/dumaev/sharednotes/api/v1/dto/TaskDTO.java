package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaskDTO {
    private Long id;
    private String text;
    private boolean isDone;

    private long taskListId;
}
