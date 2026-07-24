class BookingsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def create
    booking = Booking.new(booking_params)
    if booking.save
      render json: booking.as_json(include: %i[booking_stops flight_detail]), status: :created
    else
      render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def render_not_found(exception)
    render json: { errors: [exception.message] }, status: :not_found
  end

  def booking_params
    permitted = params.require(:booking).permit(
      :route_id, :car_id, :driver_id,
      :customer_name, :customer_phone, :customer_email,
      :pickup_location, :dropoff_location, :pickup_date, :pickup_time,
      :passenger_count, :luggage_count, :special_instructions, :has_multiple_stops,
      :price,
      booking_stops_attributes: %i[stop_location sequence_order],
      flight_detail_attributes: %i[flight_number airline_name flight_type scheduled_time]
    )

    route = Route.find_by(id: permitted[:route_id])

    permitted.delete(:booking_stops_attributes) unless truthy?(permitted[:has_multiple_stops]) && route&.route_type == "standard"
    permitted.delete(:flight_detail_attributes) unless route&.origin.to_s.downcase.include?("airport")

    permitted
  end

  def truthy?(value)
    ActiveModel::Type::Boolean.new.cast(value)
  end
end
