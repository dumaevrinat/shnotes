package com.dumaev.sharednotes.service;

import com.dumaev.sharednotes.entity.Task;
import com.dumaev.sharednotes.exception.NoSuchTaskListException;
import com.dumaev.sharednotes.repository.TaskListsRepository;
import com.dumaev.sharednotes.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class TasksService {

    private final TasksRepository tasksRepository;
    private final TaskListsRepository taskListsRepository;

    @Autowired
    public TasksService(TasksRepository tasksRepository, TaskListsRepository taskListsRepository) {
        this.tasksRepository = tasksRepository;
        this.taskListsRepository = taskListsRepository;
    }

    public List<Task> getTasks(UUID uuid){
        return tasksRepository.getAllByTaskList_Id(uuid);
    }

    public Task addTask(Task task) {
        if (!taskListsRepository.existsById(task.getTaskList().getId())){
            throw new NoSuchTaskListException();
        }

        return tasksRepository.save(task);
    }

    public void updateTaskInfo(Task task) {
        if (!taskListsRepository.existsById(task.getTaskList().getId())){
            throw new NoSuchTaskListException();
        }

        tasksRepository.save(task);
    }

    @Transactional
    public void deleteTask(UUID uuid) {
        tasksRepository.deleteById(uuid);
    }
}
