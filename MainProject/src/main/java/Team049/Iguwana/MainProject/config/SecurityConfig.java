package Team049.Iguwana.MainProject.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity(debug = false)
public class SecurityConfig {
    @Autowired
    private CorsFilter corsFilter;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable();
        http.cors();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
//                .apply(new CustomDsl())
//                .and()
                .authorizeRequests()
//                .antMatchers("/v1/members/join","/v1/members/refresh","/login","/join")
//                .permitAll()
//                .antMatchers("/**")
//                .access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll();
        return http.build();
    }

//    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {
//
//        @Override
//        public void configure(HttpSecurity builder) throws Exception {
//            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
////            final JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,memberRepository,bCryptPasswordEncoder);
////            jwtAuthenticationFilter.setFilterProcessesUrl("/v1/members/login");
//            builder
//                    .addFilter(corsFilter)
//                    .addFilter(new JwtAuthenticationFilter(authenticationManager, memberRepository, bCryptPasswordEncoder))
////                    .addFilter(jwtAuthenticationFilter)
//                    .addFilter(new JwtAuthorizationFilter(authenticationManager, memberRepository));
//        }
//    }
}
