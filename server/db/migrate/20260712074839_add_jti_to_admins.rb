class AddJtiToAdmins < ActiveRecord::Migration[7.1]
  def change
    add_column :admins, :jti, :string
    add_index  :admins, :jti, unique: true
  end
end