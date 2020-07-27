package com.dumaev.sharednotes.repository;

import com.dumaev.sharednotes.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository<Note, Long> {

    List<Note> findAllByNotebook_StringId(String stringId);

}
