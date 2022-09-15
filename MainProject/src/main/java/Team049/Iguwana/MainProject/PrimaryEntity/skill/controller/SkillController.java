package Team049.Iguwana.MainProject.PrimaryEntity.skill.controller;


import Team049.Iguwana.MainProject.PrimaryEntity.skill.dto.SkillDto;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.mapper.SkillMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.service.SkillService;
import Team049.Iguwana.MainProject.dto.MultiResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/v1/skill")
@Slf4j
@Validated
public class SkillController {

    private final SkillMapper mapper;

    private final SkillService service;

    public SkillController(SkillMapper mapper, SkillService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postSkill(@Valid @RequestBody SkillDto.Post post) {
        Skill skill = service.createSkill(mapper.skillPostToSkill(post));
        return new ResponseEntity(mapper.skillToResponse(skill), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getSkills(
            @Positive @RequestParam int page,
            @Positive @RequestParam int size
    ) {
        Page<Skill> pageSkill = service.findSkills(page-1, size);
        List<SkillDto.CountResponse> skills = service.changePage(pageSkill.getContent());

        return new ResponseEntity(
                new MultiResponseDto<>(skills,pageSkill), HttpStatus.OK);
    }
}
