class CarsController < ApplicationController
  include CarSerialization

  def index
    cars = Car.where(is_available: true).order(:name)
    render json: cars.map { |car| serialize_car(car) }
  end
end
