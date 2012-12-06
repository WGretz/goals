Goals::Application.routes.draw do
  devise_for :users
  resources :goals do
    resources :goal_entries
  end
  root :to => 'static#index'
end
