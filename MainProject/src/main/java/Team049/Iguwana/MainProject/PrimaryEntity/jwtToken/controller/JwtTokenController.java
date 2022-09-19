package Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.controller;

import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.dto.JwtTokenDto;
import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.entity.JwtToken;
import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.mapper.JwtTokenMapper;
import Team049.Iguwana.MainProject.PrimaryEntity.jwtToken.service.JwtTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/v1/jwt")
@Validated
public class JwtTokenController {
    private final JwtTokenService jwtTokenService;
    private final JwtTokenMapper jwtTokenMapper;

    public JwtTokenController(JwtTokenService jwtTokenService, JwtTokenMapper jwtTokenMapper){
        this.jwtTokenService = jwtTokenService;
        this.jwtTokenMapper = jwtTokenMapper;
    }

    @PostMapping("/refresh")
    public ResponseEntity getRefreshToken(@Validated @RequestBody JwtTokenDto.Refresh refresh, HttpServletResponse response){
        JwtToken jwtToken = jwtTokenMapper.jwtTokenRefreshToJwtToken(refresh);
        JwtToken newJwtToken = jwtTokenService.reAccessToken(jwtToken, response);
        return new ResponseEntity(HttpStatus.OK);
    }
}
