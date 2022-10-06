package Team049.Iguwana.MainProject.PrimaryEntity.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    public enum MessageType{
        CHAT, LEAVE
    }

    private MessageType messageType;
    private String roomId;
    private String message;
    private String sender;
    private String role;
    private long userId;
}
