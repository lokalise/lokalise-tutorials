Rails.application.routes.draw do
  resources :pages, only: :index

  get '/auth/:provider/callback', to: 'sessions#create'
  
  root 'pages#index'
end
