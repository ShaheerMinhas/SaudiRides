module Admin
  class RoutesController < BaseController
    before_action :set_route, only: %i[show update destroy]

    def index
      routes = Route.all
      routes = routes.where(route_type: params[:route_type]) if params[:route_type].present?
      render json: routes.as_json(include: :route_stops)
    end

    def show
      render json: @route.as_json(include: [:route_stops, :car_route_pricings])
    end

    def create
      route = Route.new(route_params)
      if route.save
        render json: route.as_json(include: :route_stops), status: :created
      else
        render_errors(route)
      end
    end

    def update
      if @route.update(route_params)
        render json: @route.as_json(include: :route_stops)
      else
        render_errors(@route)
      end
    end

    def destroy
      @route.destroy
      head :no_content
    end

    private

    def set_route
      @route = Route.find(params[:id])
    end

    def route_params
      params.require(:route).permit(
        :name, :origin, :destination, :route_type, :is_active,
        route_stops_attributes: %i[id stop_name stop_order _destroy]
      )
    end
  end
end
