package com.lokalise.i18nboot;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import java.util.Locale;

@Component
public class MessageSourceTest implements CommandLineRunner {

    private final MessageSource messageSource;

    public MessageSourceTest(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public void run(String... args) throws Exception {
        // Fetch and print the message for "hello" in Italian locale
        String message = messageSource.getMessage("hello", null, Locale.ITALIAN);
        System.out.println(message);  // Should print "Ciao!"
    }
}
