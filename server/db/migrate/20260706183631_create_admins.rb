class CreateAdmins < ActiveRecord::Migration[7.1]
  def change
    create_table :admins do |t|
      t.string  :name, null: false
      t.string  :email, null: false
      t.string  :password_digest, null: false
      t.string  :role, default: "admin"
      t.boolean :is_active, default: true
      t.string  :jti, null: false          # used to invalidate JWTs on logout/password change

      t.timestamps
    end

    add_index :admins, :email, unique: true
    add_index :admins, :jti, unique: true
  end
end