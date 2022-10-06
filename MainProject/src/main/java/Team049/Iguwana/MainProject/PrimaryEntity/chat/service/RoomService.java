package Team049.Iguwana.MainProject.PrimaryEntity.chat.service;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.entity.Room;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.RoomRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public void saveRoom(long studentId, long teacherId, String roomId, String roomName){
        Room room = new Room();
        room.setRoomId(roomId);
        room.setRoomName(roomName);
        room.setStudentId(studentId);
        room.setTeacherId(teacherId);
        roomRepository.save(room);
    }

    public void deleteRoomRepo(String roomId){
        Room room = findverifiedRoom(roomId);
        roomRepository.delete(room);
    }

    public Room findverifiedRoom(String roomId){
        Optional<Room> optionalRoom = roomRepository.findByRoomId(roomId);
        Room room = optionalRoom.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TEMP_NOT_FOUND));
        return room;
    }

    public List<Room> findAll(){
        return roomRepository.findAll();
    }
}
