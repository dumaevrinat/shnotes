package com.dumaev.sharednotes.repository;

import com.dumaev.sharednotes.entity.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskListsRepository extends JpaRepository<TaskList, UUID> {
    List<TaskList> findAllByNotebook_Id(UUID uuid);
}
