class FlightDetail < ApplicationRecord
  FLIGHT_TYPES = %w[arrival departure].freeze

  belongs_to :booking

  validates :flight_number, :airline_name, presence: true
  validates :flight_type, inclusion: { in: FLIGHT_TYPES }
  validates :scheduled_time, presence: true
end
