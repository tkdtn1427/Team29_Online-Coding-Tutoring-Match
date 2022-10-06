package Team049.Iguwana.MainProject.PrimaryEntity.s3.repository;


import Team049.Iguwana.MainProject.PrimaryEntity.s3.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ImagesRepository extends JpaRepository<Images, Long> {

    @Query(value ="select * from images where images_key = :keys", nativeQuery = true)
    Optional<Images> findByKeys(String keys);
}
