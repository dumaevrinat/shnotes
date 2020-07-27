package com.dumaev.sharednotes.repository;

import com.dumaev.sharednotes.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Task, Long> {
    List<Task> getAllByTaskList_Id(Long id);
}