Goals::Application.routes.draw do
  devise_for :users
  resources :goals do
    resources :goal_entries
    member do
      post :archive
    end
    collection do
      get :archived
    end
  end
  namespace :api do
    namespace :v1 do
      resources :goals do
        resources :goal_entries
      end
      resources :goal_entries
    end
  end
  root :to => 'static#index'
end
