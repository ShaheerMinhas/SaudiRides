class BookingStop < ApplicationRecord
  belongs_to :booking

  validates :stop_location, presence: true
  validates :sequence_order, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
end
