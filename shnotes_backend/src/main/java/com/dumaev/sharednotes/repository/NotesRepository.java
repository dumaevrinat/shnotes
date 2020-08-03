package com.dumaev.sharednotes.repository;

import com.dumaev.sharednotes.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotesRepository extends JpaRepository<Note, UUID> {

    List<Note> findAllByNotebook_Id(UUID uuid);

}
