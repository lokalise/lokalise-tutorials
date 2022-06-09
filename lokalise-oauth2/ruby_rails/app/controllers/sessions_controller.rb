class SessionsController < ApplicationController
  def create
    session[:access_token] = request.env['omniauth.auth']['credentials']['token']
    session[:refresh_token] = request.env['omniauth.auth']['credentials']['refresh_token']
    
    redirect_to pages_path
  end
end