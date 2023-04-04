package com.lokalise.javai18nspringboot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import java.util.Locale;
import java.util.TimeZone;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import com.transferwise.icu.ICUMessageSource;
import com.transferwise.icu.ICUReloadableResourceBundleMessageSource;

@Configuration
public class MyBeansConfig {

  @Bean
  public LocaleResolver localeResolver() {
      CookieLocaleResolver localeResolver = new CookieLocaleResolver();
      localeResolver.setDefaultLocale(Locale.ENGLISH);
      // timezone to change datetime output
      localeResolver.setDefaultTimeZone(TimeZone.getTimeZone("UTC"));

      return localeResolver;
  }

  @Bean
  public LocaleChangeInterceptor localeChangeInterceptor() {
      LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
      // Defaults to "locale" if not set
      localeChangeInterceptor.setParamName("localeData");

      return localeChangeInterceptor;
  }

  @Bean
  public ICUMessageSource messageSource() {
      ICUReloadableResourceBundleMessageSource messageSource = new ICUReloadableResourceBundleMessageSource();
      messageSource.setBasename("classpath:lang/messages");
      return messageSource;
  }
}