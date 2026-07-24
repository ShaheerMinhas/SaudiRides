class Car < ApplicationRecord
  CAR_TYPES = %w[SUV Sedan Van Coaster].freeze

  has_one_attached :picture
  has_many :car_route_pricings, dependent: :destroy
  has_many :routes, through: :car_route_pricings
  has_many :drivers, dependent: :nullify

  validates :name, presence: true
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :registration_number, presence: true, uniqueness: true
  validates :car_type, inclusion: { in: CAR_TYPES }
end