package Team049.Iguwana.MainProject.PrimaryEntity.schedle;


import Team049.Iguwana.MainProject.PrimaryEntity.email.repository.EmailRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class ScheduleService {

    private final EmailRepository emailRepository;

    public ScheduleService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public static String getNowDateTime24() {

        long time = System.currentTimeMillis();
        SimpleDateFormat dayTime = new SimpleDateFormat("yyyy.MM.dd kk:mm:ss E요일");
        String str = dayTime.format(new Date(time));
        return str;
    }

//@Scheduled(fixedDelay = 3000,  initialDelay = 2000)
//    public void threeRepeatJob(){
//        System.out.println("\n");
//        System.out.println("=======================================");
//        System.out.println("[ScheduleService] : [threeRepeatJob] : [start]");
//        System.out.println("[JopTime] : " + getNowDateTime24());
//        System.out.println("=======================================");
//        System.out.println("\n");
//    }

    @Scheduled(cron = "0 58 4 * * *")
    public void everyDay_M_8_58_RepeatJob(){
        emailRepository.deleteAll();
    }

}
