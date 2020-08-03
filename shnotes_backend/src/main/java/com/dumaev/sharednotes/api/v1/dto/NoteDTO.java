package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class NoteDTO {
    private UUID id;
    private String title;
    private String text;
    private boolean isHighPriority;
    private boolean isDone;

    private UUID notebookId;
}
