package com.dumaev.sharednotes.api.v1.dto;

import com.dumaev.sharednotes.entity.Note;
import com.dumaev.sharednotes.entity.Notebook;
import com.dumaev.sharednotes.entity.Task;
import com.dumaev.sharednotes.entity.TaskList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class Mapper {

    private final ModelMapper modelMapper;

    @Autowired
    public Mapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public NotebookDTO convertToDTO(Notebook notebook) {
        return modelMapper.map(notebook, NotebookDTO.class);
    }

    public NoteDTO convertToDTO(Note note) {
        NoteDTO noteDTO = modelMapper.map(note, NoteDTO.class);
        noteDTO.setNotebookId(note.getNotebook().getStringId());

        return noteDTO;
    }

    public TaskDTO convertToDTO(Task task) {
        TaskDTO taskDTO = modelMapper.map(task, TaskDTO.class);
        taskDTO.setTaskListId(task.getTaskList().getId());

        return taskDTO;
    }

    public TaskListDTO convertToDTO(TaskList taskList) {
        TaskListDTO taskListDTO = modelMapper.map(taskList, TaskListDTO.class);
        taskListDTO.setNotebookId(taskList.getNotebook().getStringId());

        taskListDTO.setTasks(taskList.getTasks()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toSet()));

        return taskListDTO;
    }

    public Notebook convertToEntity(NotebookDTO notebookDTO) {
        return modelMapper.map(notebookDTO, Notebook.class);
    }

    public Note convertToEntity(NoteDTO noteDTO) {
        Note note = modelMapper.map(noteDTO, Note.class);

        Notebook notebook = new Notebook();
        notebook.setStringId(noteDTO.getNotebookId());

        note.setNotebook(notebook);

        return note;
    }

    public Task convertToEntity(TaskDTO taskDTO) {
        Task task = modelMapper.map(taskDTO, Task.class);

        TaskList taskList = new TaskList();
        taskList.setId(taskDTO.getTaskListId());

        task.setTaskList(taskList);

        return task;
    }

    public TaskList convertToEntity(TaskListDTO taskListDTO) {
        TaskList taskList = modelMapper.map(taskListDTO, TaskList.class);

        Notebook notebook = new Notebook();
        notebook.setStringId(taskListDTO.getNotebookId());

        taskList.setNotebook(notebook);

        return taskList;
    }
}
