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

    public Notebook getNotebook(String stringId) {
        return notebooksRepository.findById(stringId).orElseThrow(NoSuchNotebookException::new);
    }

    public String addNotebook(Notebook notebook) {
        final Notebook notebookToAdd = new Notebook();

        String stringId = UUID.randomUUID().toString().replace("-", "");

        notebookToAdd.setStringId(stringId);
        notebookToAdd.setName(notebook.getName().isEmpty() ? "Untitled" : notebook.getName());

        notebooksRepository.save(notebookToAdd);

        return stringId;
    }

    @Transactional
    public void deleteNotebook(String stringId) {
        notebooksRepository.deleteById(stringId);
    }

    public void changeName(String stringId, String name) {
        Notebook notebook = notebooksRepository.findById(stringId).orElseThrow(NoSuchNotebookException::new);

        notebook.setName(name.isEmpty() ? "Untitled" : name);
        notebooksRepository.save(notebook);
    }
}
