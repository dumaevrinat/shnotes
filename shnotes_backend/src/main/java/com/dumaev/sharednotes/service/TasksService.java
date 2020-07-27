package com.dumaev.sharednotes.service;

import com.dumaev.sharednotes.entity.Task;
import com.dumaev.sharednotes.exception.NoSuchTaskListException;
import com.dumaev.sharednotes.repository.TaskListsRepository;
import com.dumaev.sharednotes.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TasksService {

    private final TasksRepository tasksRepository;
    private final TaskListsRepository taskListsRepository;

    @Autowired
    public TasksService(TasksRepository tasksRepository, TaskListsRepository taskListsRepository) {
        this.tasksRepository = tasksRepository;
        this.taskListsRepository = taskListsRepository;
    }

    public List<Task> getTasks(Long taskListsId){
        return tasksRepository.getAllByTaskList_Id(taskListsId);
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
    public void deleteTask(Long id) {
        tasksRepository.deleteById(id);
    }
}
