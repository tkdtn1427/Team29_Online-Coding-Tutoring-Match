package Team049.Iguwana.MainProject.PrimaryEntity.tutoring.mapper;

import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.dto.TutoringDto;
import Team049.Iguwana.MainProject.PrimaryEntity.tutoring.entity.Tutoring;
import org.mapstruct.Mapper;

import java.util.*;

@Mapper(componentModel = "spring")
public interface TutoringMapper {
    default Tutoring tutoringRegisterToTutoring(TutoringDto.Register requestBody){
        Tutoring tutoring = new Tutoring();
        tutoring.setStart_pd(requestBody.getStart_pd());
        tutoring.setEnd_pd(requestBody.getEnd_pd());
        tutoring.setContent(requestBody.getContent());
        tutoring.setSubject(requestBody.getSubject());
        List<Map<String, Object>> map = requestBody.getTime();
        StringBuilder sb = new StringBuilder("");
        for(String str : map.get(0).keySet()){
            sb.append(str+":"+map.get(0).get(str)+"\n");
        }
        sb.replace(sb.length()-1,sb.length(),"");
        tutoring.setTime(sb.toString());
        return tutoring;
    }
    default Tutoring tutoringPatchToTutoring(TutoringDto.Patch requestBody){
        Tutoring tutoring = new Tutoring();
        tutoring.setTutoringId(requestBody.getTutoringId());
        tutoring.setStart_pd(requestBody.getStart_pd());
        tutoring.setEnd_pd(requestBody.getEnd_pd());
        tutoring.setContent(requestBody.getContent());
        tutoring.setSubject(requestBody.getSubject());
        List<Map<String, Object>> map = requestBody.getTime();
        StringBuilder sb = new StringBuilder("");
        for(String str : map.get(0).keySet()){
            sb.append(str+":"+map.get(0).get(str)+"\n");
        }
        sb.replace(sb.length()-1,sb.length(),"");
        tutoring.setTime(sb.toString());
        return tutoring;
    }

    default TutoringDto.Response tutoringToTutoringResponse(Tutoring requestBody){
        TutoringDto.Response response = new TutoringDto.Response();
        response.setStudentId(requestBody.getStudent().getStudentId());
        response.setTeacherId(requestBody.getTeacher().getTeacherId());
        response.setTutoringId(requestBody.getTutoringId());
        response.setSubject(requestBody.getSubject());
        response.setContent(requestBody.getContent());
        response.setStart_pd(requestBody.getStart_pd());
        response.setEnd_pd(requestBody.getEnd_pd());
        List<Map<String, Object>> timeSet = new ArrayList<>();
        timeSet.add(new HashMap<>());
        String str = requestBody.getTime();
        StringTokenizer st = new StringTokenizer(str,"\n");
        while (st.hasMoreTokens()){
            String perTime = st.nextToken();
            StringTokenizer st_ = new StringTokenizer(perTime, ":");
            timeSet.get(0).put(st_.nextToken(), st_.nextToken()+":"+st_.nextToken()+":"+st_.nextToken());
        }
        response.setTime(timeSet);

        return response;
    }
}
