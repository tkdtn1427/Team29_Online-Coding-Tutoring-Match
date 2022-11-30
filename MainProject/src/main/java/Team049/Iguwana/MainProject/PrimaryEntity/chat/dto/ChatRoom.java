package Team049.Iguwana.MainProject.PrimaryEntity.chat.dto;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.entity.Room;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Service
public class ChatRoom {
    private String roomId;
    private String roomName;
    private long studentId;
    private long teacherId;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public static ChatRoom create(ChatRoomForm.Create create, String roomName){
        ChatRoom newChatRoom = new ChatRoom();
        newChatRoom.roomId = UUID.randomUUID().toString();
        newChatRoom.setRoomName(roomName);
        newChatRoom.setStudentId(create.getStudentId());
        newChatRoom.setTeacherId(create.getTeacherId());
        return newChatRoom;
    }

    public static ChatRoom load(Room room){
        ChatRoom newChatRoom = new ChatRoom();
        newChatRoom.setRoomId(room.getRoomId());
        newChatRoom.setRoomName(room.getRoomName());
        newChatRoom.setStudentId(room.getStudentId());
        newChatRoom.setTeacherId(room.getTeacherId());
        return newChatRoom;
    }
}
