package com.dumaev.sharednotes.api.v1.controller;

import com.dumaev.sharednotes.api.v1.dto.Mapper;
import com.dumaev.sharednotes.api.v1.dto.TaskDTO;
import com.dumaev.sharednotes.api.v1.dto.TaskListDTO;
import com.dumaev.sharednotes.entity.Task;
import com.dumaev.sharednotes.entity.TaskList;
import com.dumaev.sharednotes.service.TaskListsService;
import com.dumaev.sharednotes.service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@CrossOrigin
@RequestMapping("api/v1/tasklists")
public class TaskListsController {

    private final TaskListsService taskListsService;

    private final TasksService tasksService;

    private final Mapper mapper;

    @Autowired
    public TaskListsController(TaskListsService taskListsService, TasksService tasksService, Mapper mapper) {
        this.taskListsService = taskListsService;
        this.tasksService = tasksService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<List<TaskListDTO>> getTaskLists(@RequestParam UUID notebookId) {
        return ResponseEntity.ok(taskListsService.getTaskLists(notebookId)
                .stream()
                .map(mapper::convertToDTO)
                .collect(Collectors.toList()));
    }

    @GetMapping(value = "/getFullInfo")
    public ResponseEntity<List<TaskListDTO>> getTaskListsFullInfo(@RequestParam UUID notebookId) {
        List<TaskListDTO> taskListDTOs = taskListsService.getTaskLists(notebookId)
                .stream()
                .map(mapper::convertToDTO)
                .collect(Collectors.toList());

        for(TaskListDTO taskListDTO: taskListDTOs) {
            Set<TaskDTO> tasks = tasksService.getTasks(taskListDTO.getId())
                    .stream()
                    .map(mapper::convertToDTO)
                    .collect(Collectors.toSet());

            taskListDTO.setTasks(tasks);
        }

        return ResponseEntity.ok(taskListDTOs);
    }

    @GetMapping(value = "/delete")
    public ResponseEntity<Object> deleteTaskList(@RequestParam UUID taskListId) {
        taskListsService.deleteTaskList(taskListId);

        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/update")
    public ResponseEntity<Object> updateTaskList(@Validated @RequestBody TaskListDTO taskListDTO) {
        taskListsService.updateTaskListInfo(mapper.convertToEntity(taskListDTO));

        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addTaskList(@Validated @RequestBody TaskListDTO taskListDTO) {
        TaskList taskList = taskListsService.addTaskList(mapper.convertToEntity(taskListDTO));

            Set<Task> tasks = taskListDTO.getTasks()
                .stream()
                .map((taskDTO -> {
                    Task task = mapper.convertToEntity(taskDTO);
                    task.setTaskList(taskList);

                    return tasksService.addTask(task);
                }))
                .collect(Collectors.toSet());

        taskList.setTasks(tasks);

        return ResponseEntity.ok(mapper.convertToDTO(taskList));
    }
}
