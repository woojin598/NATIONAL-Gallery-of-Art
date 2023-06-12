package kr.co.tj.configservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication //애플리케이션의 진입점
@EnableConfigServer // 스프링클라우드 구성 서버 활성화(클라이언트에게 애플리케이션 제공하는 역할)
public class ConfigServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigServiceApplication.class, args);
	}

}
