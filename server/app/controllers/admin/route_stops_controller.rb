module Admin
  class RouteStopsController < BaseController
    before_action :set_route, only: %i[index create]
    before_action :set_route_stop, only: %i[update destroy]

    def index
      render json: @route.route_stops.order(:stop_order)
    end

    def create
      route_stop = @route.route_stops.new(route_stop_params)
      if route_stop.save
        render json: route_stop, status: :created
      else
        render_errors(route_stop)
      end
    end

    def update
      if @route_stop.update(route_stop_params)
        render json: @route_stop
      else
        render_errors(@route_stop)
      end
    end

    def destroy
      @route_stop.destroy
      head :no_content
    end

    private

    def set_route
      @route = Route.find(params[:route_id])
    end

    def set_route_stop
      @route_stop = RouteStop.find(params[:id])
    end

    def route_stop_params
      params.require(:route_stop).permit(:stop_name, :stop_order)
    end
  end
end
