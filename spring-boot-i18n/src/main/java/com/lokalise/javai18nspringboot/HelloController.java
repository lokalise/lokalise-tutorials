package com.lokalise.javai18nspringboot;
import org.springframework.stereotype.Controller;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Controller public class HelloController {
  @GetMapping("/")
  public String hello() {
      return "hello";
  }

  @GetMapping("/datetime")
  @ResponseBody
  public String dateTime(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                         @RequestParam("datetime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime datetime) {
      return date.toString() + "<br>" + datetime.toString();
  }
}