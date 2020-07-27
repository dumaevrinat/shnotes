package com.dumaev.sharednotes.api.v1.exception;

import com.dumaev.sharednotes.exception.NoSuchNotebookException;
import com.dumaev.sharednotes.exception.NoSuchTaskListException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(NoSuchNotebookException.class)
    protected ResponseEntity<Exception> handleNoSuchNotebookException() {
        return new ResponseEntity<>(new Exception(400, "No such notebook"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchTaskListException.class)
    protected ResponseEntity<Exception> handleNoSuchTaskListException() {
        return new ResponseEntity<>(new Exception(400, "No such task list"), HttpStatus.BAD_REQUEST);
    }

    @Data
    @AllArgsConstructor
    private static class Exception{
        private int code;
        private String message;
    }
}
