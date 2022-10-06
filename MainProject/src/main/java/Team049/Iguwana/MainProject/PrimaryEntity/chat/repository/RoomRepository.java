package Team049.Iguwana.MainProject.PrimaryEntity.chat.repository;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query(value = "select * from room where room_id = :roomId", nativeQuery = true)
    Optional<Room> findByRoomId(String roomId);
}
