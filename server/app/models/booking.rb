class Booking < ApplicationRecord
  STATUSES = %w[new in_progress complete cancelled].freeze

  belongs_to :route
  belongs_to :car
  belongs_to :driver, optional: true

  has_many :booking_stops, dependent: :destroy
  has_one :flight_detail, dependent: :destroy

  accepts_nested_attributes_for :booking_stops
  accepts_nested_attributes_for :flight_detail

  validates :customer_name, :customer_phone, :customer_email, presence: true
  validates :pickup_location, :dropoff_location, presence: true
  validates :pickup_date, :pickup_time, presence: true
  validates :passenger_count, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :status, inclusion: { in: STATUSES }
  validate :booking_stops_present_when_flagged
  validate :flight_detail_present_for_airport_routes

  private

  def booking_stops_present_when_flagged
    return unless has_multiple_stops?

    errors.add(:booking_stops, "must be provided when has_multiple_stops is true") if booking_stops.empty?
    errors.add(:booking_stops, "can only be added on standard routes; ziyarat routes use their own fixed route_stops") if route && route.route_type != "standard"
  end

  def flight_detail_present_for_airport_routes
    return unless route && route.origin.to_s.downcase.include?("airport")

    errors.add(:flight_detail, "is required when the route originates from an airport") if flight_detail.blank?
  end
end
