package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.mapper.TutoringMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.service.TutoringService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/tutorings")
@Validated
public class TutoringController {
    private final TutoringMapper tutoringMapper;
    private final TutoringService tutoringService;

    public TutoringController(TutoringMapper tutoringMapper, TutoringService tutoringService){
        this.tutoringMapper = tutoringMapper;
        this.tutoringService = tutoringService;
    }

//    @PostMapping("/register")
//    public ResponseEntity registerTutoring(@Validated @RequestBody ){
//        return new ResponseEntity(HttpStatus.CREATED);
//    }
}
