Rails.application.routes.draw do
  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    resources :feedbacks
    root 'static_pages#index'
  end
end
