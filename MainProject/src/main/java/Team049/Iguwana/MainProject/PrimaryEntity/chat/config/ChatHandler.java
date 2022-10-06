package Team049.Iguwana.MainProject.PrimaryEntity.chat.config;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatMessage;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoom;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.ChatRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.StringTokenizer;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChatHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatRepository chatRepository;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        log.info("메시지 전송 = {} : {}", session, message.getPayload());
        String msg = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(msg, ChatMessage.class);

        ChatRoom chatRoom = chatRepository.findById(chatMessage.getRoomId());
        chatService.handleMessage(session, chatMessage, objectMapper, chatRoom);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Map<String, String> data = urlToData(session);
        if(data != null){
            ChatRoom chatRoom = chatRepository.findById(data.get("roomId"));
            ChatMessage chatMessage = dataToMessage(data);
            chatService.handleMessage(session,chatMessage,objectMapper,chatRoom);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("연결 끊킴");
    }

    public static Map<String, String> urlToData(WebSocketSession session){
        Map<String, String> map = new LinkedHashMap<>();
        if (session.getUri().getQuery() != null){
            String[] url = session.getUri().getQuery().split("&");
            for(String tmp : url){
                StringTokenizer st = new StringTokenizer(tmp,"=");
                while(st.hasMoreTokens()){
                    map.put(st.nextToken(), st.nextToken());
                }
            }
        }else{
            map = null;
        }

        return map;
    }

    public static ChatMessage dataToMessage(Map<String, String> data){
        String user = data.get("role").equals("student") ? "학생" : "선생님";
        user += " " + data.get("userId");
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessageType(ChatMessage.MessageType.CHAT);
        chatMessage.setRole(data.get("role"));
        chatMessage.setSender(user);
        chatMessage.setRoomId(data.get("roomId"));
        chatMessage.setUserId(Long.parseLong(data.get("userId")));
        return chatMessage;
    }
}
