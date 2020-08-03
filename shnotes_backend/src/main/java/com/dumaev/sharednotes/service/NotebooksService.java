package com.dumaev.sharednotes.service;

import com.dumaev.sharednotes.entity.Notebook;
import com.dumaev.sharednotes.exception.NoSuchNotebookException;
import com.dumaev.sharednotes.repository.NotebooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class NotebooksService {

    private final NotebooksRepository notebooksRepository;

    @Autowired
    public NotebooksService(NotebooksRepository notebooksRepository) {
        this.notebooksRepository = notebooksRepository;
    }

    public Notebook getNotebook(UUID uuid) {
        return notebooksRepository.findById(uuid).orElseThrow(NoSuchNotebookException::new);
    }

    public UUID addNotebook(Notebook notebook) {
        notebook.setName(notebook.getName().isEmpty() ? "Untitled" : notebook.getName());

        return notebooksRepository.save(notebook).getId();
    }

    @Transactional
    public void deleteNotebook(UUID uuid) {
        notebooksRepository.deleteById(uuid);
    }

    public void changeName(UUID uuid, String name) {
        Notebook notebook = notebooksRepository.findById(uuid).orElseThrow(NoSuchNotebookException::new);

        notebook.setName(name.isEmpty() ? "Untitled" : name);
        notebooksRepository.save(notebook);
    }
}
