package com.dumaev.sharednotes.repository;

import com.dumaev.sharednotes.entity.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotebooksRepository extends JpaRepository<Notebook, UUID> {
    boolean existsById(UUID uuid);
}
