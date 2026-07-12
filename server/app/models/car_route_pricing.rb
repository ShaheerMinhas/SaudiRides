class CarRoutePricing < ApplicationRecord
  belongs_to :car
  belongs_to :route

  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :car_id, uniqueness: { scope: :route_id, message: "already has a price set for this route" }
end
