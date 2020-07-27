package com.dumaev.sharednotes.api.v1.controller;

import com.dumaev.sharednotes.api.v1.dto.Mapper;
import com.dumaev.sharednotes.api.v1.dto.TaskDTO;
import com.dumaev.sharednotes.entity.Task;
import com.dumaev.sharednotes.service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@CrossOrigin
@RequestMapping("api/v1/tasks")
public class TasksController {

    private final TasksService tasksService;

    private final Mapper mapper;

    @Autowired
    public TasksController(TasksService tasksService, Mapper mapper) {
        this.tasksService = tasksService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<List<TaskDTO>> getTasks(@RequestParam long taskListId) {
        return ResponseEntity.ok(tasksService.getTasks(taskListId)
                .stream()
                .map(mapper::convertToDTO)
                .collect(Collectors.toList()));
    }

    @GetMapping(value = "/delete")
    public ResponseEntity<Object> deleteTask(@RequestParam Long taskId) {
        tasksService.deleteTask(taskId);

        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/update")
    public ResponseEntity<Object> updateTask(@Validated @RequestBody TaskDTO taskDTO) {
        tasksService.updateTaskInfo(mapper.convertToEntity(taskDTO));

        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Object> addTask(@Validated @RequestBody TaskDTO taskDTO) {
        Task task = tasksService.addTask(mapper.convertToEntity(taskDTO));

        return ResponseEntity.ok(mapper.convertToDTO(task));
    }
}
