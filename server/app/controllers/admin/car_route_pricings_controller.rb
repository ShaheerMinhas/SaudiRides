module Admin
  class CarRoutePricingsController < BaseController
    before_action :set_car_route_pricing, only: %i[show update destroy]

    def index
      pricings = CarRoutePricing.all
      pricings = pricings.where(car_id: params[:car_id]) if params[:car_id].present?
      pricings = pricings.where(route_id: params[:route_id]) if params[:route_id].present?
      render json: pricings.as_json(include: %i[car route])
    end

    def show
      render json: @car_route_pricing.as_json(include: %i[car route])
    end

    def create
      pricing = CarRoutePricing.new(car_route_pricing_params)
      if pricing.save
        render json: pricing, status: :created
      else
        render_errors(pricing)
      end
    end

    def update
      if @car_route_pricing.update(car_route_pricing_params)
        render json: @car_route_pricing
      else
        render_errors(@car_route_pricing)
      end
    end

    def destroy
      @car_route_pricing.destroy
      head :no_content
    end

    private

    def set_car_route_pricing
      @car_route_pricing = CarRoutePricing.find(params[:id])
    end

    def car_route_pricing_params
      params.require(:car_route_pricing).permit(:car_id, :route_id, :price)
    end
  end
end
