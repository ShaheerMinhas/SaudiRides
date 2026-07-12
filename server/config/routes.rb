Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "api/hello" => "hello#index"

  resources :bookings

  namespace :admin do
    resources :routes do
      resources :route_stops, only: %i[index create]
    end
    resources :route_stops, only: %i[update destroy]
    resources :car_route_pricings
    resources :cars
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
