module Admin
  class BaseController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from JWT::DecodeError, JWT::ExpiredSignature, with: :render_unauthorized

    before_action :authenticate_admin!

    private

    def authenticate_admin!
      header = request.headers["Authorization"]
      token = header&.split(" ")&.last
      return render_unauthorized if token.blank?

      payload = JsonWebToken.decode(token)
      admin = AdminUser.find_by(id: payload[:admin_id])

      return render_unauthorized unless admin && admin.is_active && admin.jti == payload[:jti]

      @current_admin = admin
    end

    def current_admin
      @current_admin
    end

    def render_not_found(exception)
      render json: { errors: [exception.message] }, status: :not_found
    end

    def render_unauthorized(exception = nil)
      render json: { errors: ["Invalid or expired token"] }, status: :unauthorized
    end

    def render_errors(record)
      render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
