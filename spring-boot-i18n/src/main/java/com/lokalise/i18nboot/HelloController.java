package com.lokalise.i18nboot;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Controller
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "hello";  // This returns the hello.html view
    }

    @GetMapping("/datetime")
    @ResponseBody
    public String dateTime(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                          @RequestParam("datetime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime datetime) {
        return date.toString() + "<br>" + datetime.toString();
    }
}