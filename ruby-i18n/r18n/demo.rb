# frozen_string_literal: true

require 'r18n-desktop'

R18n::Filters.add('gender', :gender) do |content, config, choice|
  content.fetch(choice) { content['neutral'] }
end

# R18n::Filters.off(:gender)
# R18n::Filters.on(:gender)
# R18n::Filters.delete(:gender)

R18n.from_env('locales/')
include R18n::Helpers




requested_locale = ARGV[0] || 'en'

unless r18n.available_locales.map(&:code).include?(requested_locale)
  puts 'We do not support this locale yet :( However, we do support:'
  r18n.available_locales.each do |locale|
    puts "#{locale.title} (#{locale.code})"
  end
  exit
end

R18n.set(requested_locale)

puts t.welcome
puts l(Time.now, :standard)
puts t.incoming_messages(11)
puts t.says('f', 'Hi there!')
