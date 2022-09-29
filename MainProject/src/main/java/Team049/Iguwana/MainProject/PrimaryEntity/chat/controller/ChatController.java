package Team049.Iguwana.MainProject.PrimaryEntity.chat.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoom;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoomForm;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@Validated
public class ChatController {
    @Autowired
    private ChatRepository chatRepository;

    @PostMapping("/room")
    public ResponseEntity createRoom(@RequestBody ChatRoomForm.Create create){
        ChatRoom chatRoom = chatRepository.createChatRoom(create);
        return new ResponseEntity(chatRoom, HttpStatus.CREATED);
    }

}
