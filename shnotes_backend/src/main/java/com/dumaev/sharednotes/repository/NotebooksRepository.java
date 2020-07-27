package com.dumaev.sharednotes.repository;

import com.dumaev.sharednotes.entity.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotebooksRepository extends JpaRepository<Notebook, String> {
    boolean existsByStringId(String stringId);
}
