package Team049.Iguwana.MainProject.PrimaryEntity.skill.service;

import Team049.Iguwana.MainProject.PrimaryEntity.skill.dto.SkillDto;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.entity.Skill;
import Team049.Iguwana.MainProject.PrimaryEntity.skill.repository.SkillRepository;
import Team049.Iguwana.MainProject.exception.BusinessLogicException;
import Team049.Iguwana.MainProject.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SkillService {

    private final SkillRepository repository;

    public SkillService(SkillRepository repository) {
        this.repository = repository;
    }

    public Skill createSkill(Skill skill) {
        findSkillName(skill.getName());

        return repository.save(skill);
    }

    public Page<Skill> findSkills(int page, int size) {
        return repository.findAll(PageRequest.of(page, size,
                Sort.by("skillId").ascending()));
    }

    public List<SkillDto.CountResponse> changePage(List<Skill> skills) {
        List<SkillDto.CountResponse> responses = skills.stream()
                .map(skill -> {
                    SkillDto.CountResponse response = new SkillDto.CountResponse();
                    response.setSkillId(skill.getSkillId());
                    response.setName(skill.getName());
                    response.setCount((long) skill.getSkillTableList().size());
                    response.setColor(skill.getColor());
                    return response;
                }).collect(Collectors.toList());
        Collections.sort(responses, new Comparator<SkillDto.CountResponse>() {
            @Override
            public int compare(SkillDto.CountResponse o1, SkillDto.CountResponse o2) {
                return (int) (o2.getCount()-o1.getCount());
            }
        });
        return responses;
    }

    public void findSkillName(String name) {
        Optional<Skill> skill = repository.findByName(name);

        if (skill.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SKILL_EXISTS);
        }
    }

    public List<Skill> findSkillAll() {
        List<Skill> skills = repository.findAll();
        return skills;
    }
}
