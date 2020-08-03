package com.dumaev.sharednotes.service;

import com.dumaev.sharednotes.entity.Note;
import com.dumaev.sharednotes.exception.NoSuchNotebookException;
import com.dumaev.sharednotes.repository.NotebooksRepository;
import com.dumaev.sharednotes.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class NotesService {

    private final NotesRepository notesRepository;

    private final NotebooksRepository notebooksRepository;

    @Autowired
    public NotesService(NotesRepository notesRepository, NotebooksRepository notebooksRepository) {
        this.notesRepository = notesRepository;
        this.notebooksRepository = notebooksRepository;
    }

    public List<Note> getNotes(UUID uuid) {
        return notesRepository.findAllByNotebook_Id(uuid);
    }

    public Note addNote(Note note) {
        if (!notebooksRepository.existsById(note.getNotebook().getId())){
            throw new NoSuchNotebookException();
        }

        return notesRepository.save(note);
    }

    public Note updateNoteInfo(Note note) {
        if (!notebooksRepository.existsById(note.getNotebook().getId())){
            throw new NoSuchNotebookException();
        }

        return notesRepository.save(note);
    }

    @Transactional
    public void deleteNote(UUID uuid) {
        notesRepository.deleteById(uuid);
    }
}
