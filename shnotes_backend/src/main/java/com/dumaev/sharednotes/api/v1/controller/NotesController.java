package com.dumaev.sharednotes.api.v1.controller;

import com.dumaev.sharednotes.api.v1.dto.Mapper;
import com.dumaev.sharednotes.api.v1.dto.NoteDTO;
import com.dumaev.sharednotes.entity.Note;
import com.dumaev.sharednotes.service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@CrossOrigin
@RequestMapping("/api/v1/notes")
public class NotesController {

    private final NotesService notesService;

    private final Mapper mapper;

    @Autowired
    public NotesController(NotesService notesService, Mapper mapper) {
        this.notesService = notesService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<List<NoteDTO>> getNotes(@RequestParam String notebookId) {
        return ResponseEntity.ok(notesService.getNotes(notebookId)
                .stream()
                .map(mapper::convertToDTO)
                .collect(Collectors.toList()));
    }

    @GetMapping(value = "/delete")
    public ResponseEntity<Object> deleteNote(@RequestParam long noteId) {
        notesService.deleteNote(noteId);

        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/update")
    public ResponseEntity<Object> updateNote(@Validated @RequestBody NoteDTO noteDTO) {
        Note note = notesService.updateNoteInfo(mapper.convertToEntity(noteDTO));

        return ResponseEntity.ok(mapper.convertToDTO(note));
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addNote(@Validated @RequestBody NoteDTO noteDTO) {
        Note note = notesService.addNote(mapper.convertToEntity(noteDTO));

        return ResponseEntity.ok(mapper.convertToDTO(note));
    }
}
