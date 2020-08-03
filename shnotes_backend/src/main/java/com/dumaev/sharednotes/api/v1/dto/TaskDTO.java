package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class TaskDTO {
    private UUID id;
    private String text;
    private boolean isDone;

    private UUID taskListId;
}
