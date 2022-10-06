package Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.entity.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {
    @Query(value = "select * from jwt_token where role = :role and user_id = :userId", nativeQuery = true)
    Optional<JwtToken> findByUserId(long userId, String role);
}
