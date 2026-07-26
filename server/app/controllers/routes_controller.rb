class RoutesController < ApplicationController
  def index
    routes = Route.where(is_active: true).includes(:route_stops).order(:name)
    routes = routes.where(route_type: params[:route_type]) if params[:route_type].present?
    render json: routes.as_json(include: :route_stops)
  end
end
