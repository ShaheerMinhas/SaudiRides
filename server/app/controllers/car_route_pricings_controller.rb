class CarRoutePricingsController < ApplicationController
  def show
    pricing = CarRoutePricing.find_by!(car_id: params[:car_id], route_id: params[:route_id])
    render json: pricing
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["No pricing found for this car and route"] }, status: :not_found
  end
end
