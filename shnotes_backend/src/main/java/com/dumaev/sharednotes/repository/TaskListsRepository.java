package com.dumaev.sharednotes.repository;

import com.dumaev.sharednotes.entity.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskListsRepository extends JpaRepository<TaskList, Long> {
    List<TaskList> findAllByNotebook_StringId(String stringId);
}
