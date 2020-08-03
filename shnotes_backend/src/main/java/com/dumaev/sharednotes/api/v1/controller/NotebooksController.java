package com.dumaev.sharednotes.api.v1.controller;

import com.dumaev.sharednotes.api.v1.dto.Mapper;
import com.dumaev.sharednotes.api.v1.dto.NotebookDTO;
import com.dumaev.sharednotes.entity.Notebook;
import com.dumaev.sharednotes.service.NotebooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin()
@RequestMapping("/api/v1/notebooks")
public class NotebooksController {

    private final NotebooksService notebooksService;

    private final Mapper mapper;

    @Autowired
    public NotebooksController(NotebooksService notebooksService, Mapper mapper) {
        this.notebooksService = notebooksService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/get")
    public NotebookDTO getNotebook(@RequestParam UUID notebookId) {
        Notebook notebook = notebooksService.getNotebook(notebookId);

        return mapper.convertToDTO(notebook);
    }

    @PostMapping(value = "/add")
    public UUID addNotebook(@Validated @RequestBody NotebookDTO notebookDTO) {
        return notebooksService.addNotebook(mapper.convertToEntity(notebookDTO));
    }

    @GetMapping(value = "/delete")
    public ResponseEntity<Object> deleteNotebook(@RequestParam UUID notebookId) {
        notebooksService.deleteNotebook(notebookId);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/update")
    public ResponseEntity<Object> updateName(@RequestParam UUID notebookId, @RequestParam String name) {
        notebooksService.changeName(notebookId, name);
        return ResponseEntity.ok().build();
    }
}
