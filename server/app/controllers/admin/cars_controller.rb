module Admin
  class CarsController < BaseController
    before_action :set_car, only: %i[show update destroy]

    def index
      render json: Car.all.map { |car| serialize_car(car) }
    end

    def show
      render json: serialize_car(@car)
    end

    def create
      car = Car.new(car_params)
      if car.save
        render json: serialize_car(car), status: :created
      else
        render_errors(car)
      end
    end

    def update
      if @car.update(car_params)
        render json: serialize_car(@car)
      else
        render_errors(@car)
      end
    end

    def destroy
      @car.destroy
      head :no_content
    end

    private

    def set_car
      @car = Car.find(params[:id])
    end

    def car_params
      params.require(:car).permit(:name, :model, :capacity, :registration_number, :is_available, :car_type, :picture)
    end

    def serialize_car(car)
      car.as_json.merge(picture_url: car.picture.attached? ? url_for(car.picture) : nil)
    end
  end
end
