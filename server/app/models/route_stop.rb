class RouteStop < ApplicationRecord
  belongs_to :route

  validates :stop_name, presence: true
  validates :stop_order, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  validate :route_must_be_ziyarat

  private

  def route_must_be_ziyarat
    return unless route

    errors.add(:route, "must be a ziyarat route to have stops") unless route.route_type == "ziyarat"
  end
end
