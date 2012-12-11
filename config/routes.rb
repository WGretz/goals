Goals::Application.routes.draw do
  devise_for :users
  resources :goals do
    resources :goal_entries
    member do
      post :archive
    end
  end
  root :to => 'static#index'
end
