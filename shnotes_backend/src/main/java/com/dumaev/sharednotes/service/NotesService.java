package com.dumaev.sharednotes.service;

import com.dumaev.sharednotes.entity.Note;
import com.dumaev.sharednotes.exception.NoSuchNotebookException;
import com.dumaev.sharednotes.repository.NotebooksRepository;
import com.dumaev.sharednotes.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotesService {

    private final NotesRepository notesRepository;

    private final NotebooksRepository notebooksRepository;

    @Autowired
    public NotesService(NotesRepository notesRepository, NotebooksRepository notebooksRepository) {
        this.notesRepository = notesRepository;
        this.notebooksRepository = notebooksRepository;
    }

    public List<Note> getNotes(String stringId) {
        return notesRepository.findAllByNotebook_StringId(stringId);
    }

    public Note addNote(Note note) {
        if (!notebooksRepository.existsByStringId(note.getNotebook().getStringId())){
            throw new NoSuchNotebookException();
        }

        return notesRepository.save(note);
    }

    public Note updateNoteInfo(Note note) {
        if (!notebooksRepository.existsByStringId(note.getNotebook().getStringId())){
            throw new NoSuchNotebookException();
        }

        return notesRepository.save(note);
    }

    @Transactional
    public void deleteNote(Long id) {
        notesRepository.deleteById(id);
    }
}
