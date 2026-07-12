class Car < ApplicationRecord
  has_one_attached :picture
  has_many :car_route_pricings, dependent: :destroy
  has_many :routes, through: :car_route_pricings

  validates :name, presence: true
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :registration_number, presence: true, uniqueness: true
end