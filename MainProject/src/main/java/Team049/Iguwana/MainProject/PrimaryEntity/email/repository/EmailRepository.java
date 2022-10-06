package Team049.Iguwana.MainProject.PrimaryEntity.email.repository;


import Team049.Iguwana.MainProject.PrimaryEntity.email.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<Email,Long> {


    @Query(value = "select * from email where code = :code", nativeQuery = true)
    Optional<Email> findByCodes(String code);

    @Query(value = "select * from email where email = :email", nativeQuery = true)
    Optional<Email> findByEmail(String email);
}
