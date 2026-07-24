module Admin
  class AdminsController < BaseController
    def create
      admin = AdminUser.new(admin_params)
      if admin.save
        render json: admin.as_json(except: %i[password_hash jti]), status: :created
      else
        render_errors(admin)
      end
    end

    private

    def admin_params
      params.require(:admin).permit(:name, :email, :password, :role, :is_active)
    end
  end
end
