module Admin
  class BaseController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    private

    def render_not_found(exception)
      render json: { errors: [exception.message] }, status: :not_found
    end

    def render_errors(record)
      render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
