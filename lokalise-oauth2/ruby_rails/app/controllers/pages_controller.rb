require 'ruby_lokalise_api'

class PagesController < ApplicationController
  def index
    if session[:access_token]
      begin
        client = RubyLokaliseApi.oauth2_client session[:access_token]
        @projects = client.projects.collection
      rescue RubyLokaliseApi::Error::Unauthorized
        auth_client = RubyLokaliseApi.auth_client ENV['OAUTH2_CLIENT_ID'], ENV['OAUTH2_CLIENT_SECRET']
        response = auth_client.refresh session[:refresh_token]
        session[:access_token] = response['access_token']
        
        retry
      end
    end
  end
end