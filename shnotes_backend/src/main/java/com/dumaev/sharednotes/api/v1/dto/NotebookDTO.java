package com.dumaev.sharednotes.api.v1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.Set;

@Data
@NoArgsConstructor
public class NotebookDTO {
    @NonNull
    private String stringId;

    @NonNull
    private String name;

    private Set<NoteDTO> notes;

    private Set<TaskListDTO> taskLists;
}
