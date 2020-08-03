package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
public class NotebookDTO {
    @NonNull
    private UUID id;

    @NonNull
    private String name;

    private Set<NoteDTO> notes;

    private Set<TaskListDTO> taskLists;
}
