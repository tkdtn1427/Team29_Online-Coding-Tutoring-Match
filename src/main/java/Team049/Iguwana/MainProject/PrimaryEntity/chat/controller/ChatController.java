package Team049.Iguwana.MainProject.PrimaryEntity.chat.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatDto;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoom;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.dto.ChatRoomForm;
import Team049.Iguwana.MainProject.PrimaryEntity.chat.repository.ChatRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Set;

@RestController
@RequestMapping("/v1/chat")
@Validated
public class ChatController {
    @Autowired
    private ChatRepository chatRepository;

    @PostMapping("/room")
    public ResponseEntity createRoom(@RequestBody ChatRoomForm.Create create){
        ChatRoom chatRoom = chatRepository.createChatRoom(create);
        return new ResponseEntity(chatRoom, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity findRooms(@RequestParam long userId, @RequestParam String role){
        ChatDto.ResponseDto responseDto = chatRepository.findByUser(role, userId);

        return new ResponseEntity(responseDto, HttpStatus.OK);
    }
}
