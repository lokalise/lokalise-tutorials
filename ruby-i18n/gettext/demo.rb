require 'fast_gettext'

extend FastGettext::Translation

FastGettext.add_text_domain('demo', path: 'locales', type: :po)

FastGettext.available_locales = %w(en ru)

FastGettext.text_domain = 'demo'

requested_locale = ARGV[0] || 'en'
unless FastGettext.available_locales.include?(requested_locale) || requested_locale.nil?
  puts 'We do not support this locale yet :( However, we do support:'
  puts FastGettext.available_locales.join("\n")
  exit
end

FastGettext.locale = requested_locale

puts _('Welcome to our demo app!')
puts n_('incoming message', 'incoming messages', 10)  % { amount: 10, sender: 'Ann'}
puts s_('female|says') % { content: "Hey there!" }