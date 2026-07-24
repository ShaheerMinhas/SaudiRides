module Admin
  class SessionsController < BaseController
    skip_before_action :authenticate_admin!, only: :create

    def create
      admin = AdminUser.find_by(email: params[:email])

      if admin&.is_active && admin.authenticate(params[:password])
        admin.rotate_jti!
        token = JsonWebToken.encode(admin_id: admin.id, jti: admin.jti)
        render json: { token: token, admin: admin.as_json(except: %i[password_hash jti]) }
      else
        render json: { errors: ["Invalid email or password"] }, status: :unauthorized
      end
    end

    def destroy
      current_admin.rotate_jti!
      head :no_content
    end
  end
end
