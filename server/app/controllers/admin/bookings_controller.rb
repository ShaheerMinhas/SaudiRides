module Admin
  class BookingsController < BaseController
    before_action :set_booking, only: %i[show assign_driver status]

    def index
      render json: Booking.all.as_json(include: %i[route car driver booking_stops flight_detail])
    end

    def show
      render json: @booking.as_json(include: %i[route car driver booking_stops flight_detail])
    end

    def assign_driver
      if @booking.update(driver_id: params[:driver_id], status: "in_progress")
        render json: @booking.as_json(include: :driver)
      else
        render_errors(@booking)
      end
    end

    def status
      if @booking.update(status: params[:status])
        render json: @booking
      else
        render_errors(@booking)
      end
    end

    private

    def set_booking
      @booking = Booking.find(params[:id])
    end
  end
end
