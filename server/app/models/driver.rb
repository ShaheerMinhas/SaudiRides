class Driver < ApplicationRecord
  belongs_to :car, optional: true

  validates :name, :phone, presence: true
end
