module Admin
  class DriversController < BaseController
    before_action :set_driver, only: %i[show update destroy]

    def index
      drivers = Driver.all
      drivers = drivers.where(car_id: params[:car_id]) if params[:car_id].present?
      drivers = drivers.where(availability_status: true) if params[:available].present?
      render json: drivers.as_json(include: :car)
    end

    def show
      render json: @driver.as_json(include: :car)
    end

    def create
      driver = Driver.new(driver_params)
      if driver.save
        render json: driver, status: :created
      else
        render_errors(driver)
      end
    end

    def update
      if @driver.update(driver_params)
        render json: @driver
      else
        render_errors(@driver)
      end
    end

    def destroy
      @driver.destroy
      head :no_content
    end

    private

    def set_driver
      @driver = Driver.find(params[:id])
    end

    def driver_params
      params.require(:driver).permit(:name, :phone, :car_id, :availability_status)
    end
  end
end
