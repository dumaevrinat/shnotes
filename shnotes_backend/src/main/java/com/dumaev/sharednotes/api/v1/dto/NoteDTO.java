package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteDTO {
    private Long id;
    private String title;
    private String text;
    private boolean isHighPriority;
    private boolean isDone;

    private String notebookId;
}
