package com.dumaev.sharednotes.service;

import com.dumaev.sharednotes.entity.TaskList;
import com.dumaev.sharednotes.exception.NoSuchNotebookException;
import com.dumaev.sharednotes.repository.NotebooksRepository;
import com.dumaev.sharednotes.repository.TaskListsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class TaskListsService {

    private final TaskListsRepository taskListsRepository;

    private final NotebooksRepository notebooksRepository;

    @Autowired
    public TaskListsService(TaskListsRepository taskListsRepository, NotebooksRepository notebooksRepository) {
        this.taskListsRepository = taskListsRepository;
        this.notebooksRepository = notebooksRepository;
    }

    public List<TaskList> getTaskLists(UUID uuid) {
        return taskListsRepository.findAllByNotebook_Id(uuid);
    }

    public TaskList addTaskList(TaskList taskList) {
        if (!notebooksRepository.existsById(taskList.getNotebook().getId())){
            throw new NoSuchNotebookException();
        }

        return taskListsRepository.save(taskList);
    }

    public void updateTaskListInfo(TaskList taskList) {
        if (!notebooksRepository.existsById(taskList.getNotebook().getId())){
            throw new NoSuchNotebookException();
        }

        taskListsRepository.save(taskList);
    }

    @Transactional
    public void deleteTaskList(UUID uuid) {
        taskListsRepository.deleteById(uuid);
    }
}
