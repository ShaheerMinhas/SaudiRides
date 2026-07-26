class CarsController < ApplicationController
  def index
    cars = Car.where(is_available: true).order(:name)
    render json: cars.map { |car| serialize_car(car) }
  end

  private

  def serialize_car(car)
    car.as_json.merge(
      picture_url: car.picture.attached? ? rails_blob_path(car.picture, only_path: true) : nil
    )
  end
end
