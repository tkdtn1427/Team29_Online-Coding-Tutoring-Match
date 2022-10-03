package Team049.Iguwana.MainProject.PrimaryEntity.chat.dto;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.ChatRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.validation.constraints.NotNull;
import java.io.IOException;
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

    public static ChatRoom create(ChatRoomForm.Create create){
        ChatRoom newChatRoom = new ChatRoom();
        newChatRoom.roomId = UUID.randomUUID().toString();
        newChatRoom.setRoomName(create.getRoomName());
        newChatRoom.setStudentId(create.getStudentId());
        newChatRoom.setTeacherId(create.getTeacherId());
        return newChatRoom;
    }
}
