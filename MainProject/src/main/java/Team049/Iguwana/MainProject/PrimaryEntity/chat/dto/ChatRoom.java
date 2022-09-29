package Team049.Iguwana.MainProject.PrimaryEntity.chat.dto;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.ChatRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class ChatRoom {
    private String roomId;
    private String roomName;
    private Set<WebSocketSession> sessions = new HashSet<>();
    @Autowired
    private ChatRepository chatRepository;

    public static ChatRoom create(String roomName){
        ChatRoom newChatRoom = new ChatRoom();
        newChatRoom.roomId = UUID.randomUUID().toString();
        newChatRoom.setRoomName(roomName);
        return newChatRoom;
    }

    public void handleMessage(WebSocketSession session, ChatMessage chatMessage, ObjectMapper objectMapper) throws IOException {
        if(chatMessage.getMessageType() == ChatMessage.MessageType.ENTER){
            sessions.add(session);
            setUserRoom(chatMessage.getRole(), chatMessage.getUserId(), chatMessage.getRoomId());

            chatMessage.setMessage(chatMessage.getSender() + "님이 입장하셨습니다.");
        }else if(chatMessage.getMessageType() == ChatMessage.MessageType.LEAVE){
            sessions.remove(session);
            releaseUserRoom(chatMessage.getRole(), chatMessage.getUserId(), chatMessage.getRoomId());


            chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장하셨습니다.");
        }else{
            chatMessage.setMessage(chatMessage.getSender() + " : " + chatMessage.getMessage());
        }
        send(chatMessage, objectMapper);
    }

    public void send(ChatMessage chatMessage, ObjectMapper objectMapper) throws IOException {
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(chatMessage.getMessage()));
        for(WebSocketSession session : sessions)
            session.sendMessage(textMessage);
    }

    public void setUserRoom(String role, long userId, String room){
        chatRepository.getUserRooms(role).put(userId, room);
    }

    public void releaseUserRoom(String role, long userId, String room){
        chatRepository.getUserRooms(role).remove(userId, room);

    }
}
