# frozen_string_literal: true

require 'i18n'
require 'i18n/backend/pluralization'

I18n.load_path << Dir["#{File.expand_path('locales')}/*.yml"]
I18n.load_path << Dir["#{File.expand_path('locales')}/pluralization/*.rb"]
I18n::Backend::Simple.include I18n::Backend::Pluralization
I18n.default_locale = :en

requested_locale = ARGV[0]&.to_sym
unless I18n.available_locales.include?(requested_locale) || requested_locale.nil?
  puts 'We do not support this locale yet :( However, we do support:'
  puts I18n.available_locales.join("\n")
  exit
end

I18n.locale = requested_locale if requested_locale

puts I18n.t(:welcome)
puts I18n.l(Time.now, format: :short)
puts I18n.t(:incoming_messages, count: 11, sender: 'Ann')
gender = "female"
puts I18n.t("says.#{gender}", content: 'Hi there!')