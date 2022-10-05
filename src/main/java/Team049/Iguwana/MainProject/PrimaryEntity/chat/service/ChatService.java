package Team049.Iguwana.MainProject.PrimaryEntity.chat.service;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatMessage;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoom;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.entity.Room;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.ChatRepository;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.RoomRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private RoomService roomService;

    public void handleMessage(WebSocketSession session, ChatMessage chatMessage, ObjectMapper objectMapper, ChatRoom chatRoom) throws IOException {
        boolean loadFile = false;
        if(chatMessage.getMessageType() == ChatMessage.MessageType.LEAVE){
            chatRoom.getSessions().remove(session);

            releaseUserRoom(chatMessage.getRole(), chatMessage.getUserId(), chatMessage.getRoomId());
            if(chatRoom.getSessions().size() == 0){
                chatRepository.findOneToOneRoom(chatMessage.getRoomId());
                chatRepository.deleteRoom(chatRoom.getRoomId());
                deleteFile(chatRoom.getRoomId());
                roomService.deleteRoomRepo(chatRoom.getRoomId());
            }

            chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장하셨습니다.");
        }else{
            if(!chatRoom.getSessions().contains(session)){
                chatRoom.getSessions().add(session);
                String prevMessage = readFile(chatMessage.getRoomId());
                if(prevMessage != null){
                    chatMessage.setMessage(readFile(chatMessage.getRoomId()));
                    loadFile = true;
                }
                else
                    chatMessage.setMessage(chatMessage.getSender() + "님이 입장하셨습니다.");

            }else{
                String msg = chatMessage.getSender() + " : " + chatMessage.getMessage() + "\n";
                chatMessage.setMessage(chatMessage.getSender() + " : " + chatMessage.getMessage());
                saveFile(msg, chatMessage.getRoomId());
            }
            
        }
        send(chatMessage, objectMapper, chatRoom, loadFile, session);
    }

    public void send(ChatMessage chatMessage, ObjectMapper objectMapper, ChatRoom chatRoom,
                     boolean loadfile, WebSocketSession prevSession) throws IOException {
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(chatMessage.getMessage()));
        if(loadfile == false){
            List<WebSocketSession> removeList = new ArrayList<>();
            for(WebSocketSession session : chatRoom.getSessions()){
                if(!session.isOpen()){
                    removeList.add(session);
                }else{
                    session.sendMessage(textMessage);
                }
            }
            cleanSession(chatRoom.getSessions(), removeList);
        }else{
            for(WebSocketSession session : chatRoom.getSessions()){
                if(session == prevSession) session.sendMessage(textMessage);
            }
        }

    }

    public void releaseUserRoom(String role, long userId, String room){
        chatRepository.getUserRooms(role, userId).remove(room);
    }

    public void cleanSession(Set<WebSocketSession> sessions, List<WebSocketSession> removelist){
        for(WebSocketSession tmp : removelist)
            sessions.remove(tmp);
    }

    private void saveFile(String msg, String roomId){
        try(FileOutputStream stream = new FileOutputStream(System.getProperty("user.dir")+ "/messageFile/" + roomId,true)){
            stream.write(msg.getBytes("UTF-8"));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String readFile(String roomId){
        File file = new File(System.getProperty("user.dir")+ "/messageFile/" + roomId);
        if(!file.exists()){
            return null;
        }
        try(FileInputStream stream = new FileInputStream(file)){
            return new String(stream.readAllBytes());
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void deleteFile(String roomId){
        File file = new File(System.getProperty("user.dir")+ "/messageFile/" + roomId);
        if(file.exists())
            file.delete();
        else
            System.out.println("파일 존재하지않음");
    }


}
