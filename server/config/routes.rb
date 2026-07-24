Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "api/hello" => "hello#index"

  resources :bookings
  resources :contact_messages, only: [:create]
  get "car_route_pricing" => "car_route_pricings#show"

  namespace :admin do
    post "login" => "sessions#create"
    delete "logout" => "sessions#destroy"
    resources :admins, only: [:create]

    resources :routes do
      resources :route_stops, only: %i[index create]
    end
    resources :route_stops, only: %i[update destroy]
    resources :car_route_pricings
    resources :cars
    resources :drivers
    resources :bookings, only: %i[index show] do
      member do
        patch :assign_driver
        patch :status
      end
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
