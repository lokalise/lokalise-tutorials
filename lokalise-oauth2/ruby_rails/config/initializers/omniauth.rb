Rails.application.config.middleware.use OmniAuth::Builder do
  provider :lokalise, ENV['OAUTH2_CLIENT_ID'], ENV['OAUTH2_CLIENT_SECRET'],
    scope: 'read_projects read_team_users'
end