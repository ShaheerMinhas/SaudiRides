class Route < ApplicationRecord
  ROUTE_TYPES = %w[standard ziyarat].freeze

  has_many :route_stops, -> { order(:stop_order) }, dependent: :destroy
  has_many :car_route_pricings, dependent: :destroy
  has_many :cars, through: :car_route_pricings

  accepts_nested_attributes_for :route_stops, allow_destroy: true

  validates :name, :origin, :destination, presence: true
  validates :route_type, inclusion: { in: ROUTE_TYPES }
end
