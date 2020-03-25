package soen487.a2.library2;

import org.greeneyed.summer.config.enablers.EnableSummer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableSummer(xslt_view = true, log4j = false)
public class Library2Application {

    public static void main(String[] args) {
        SpringApplication.run(Library2Application.class, args);
    }

}
