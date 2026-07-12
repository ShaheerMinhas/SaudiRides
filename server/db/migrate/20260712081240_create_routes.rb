class CreateRoutes < ActiveRecord::Migration[7.1]
  def change
    create_table :routes do |t|
      t.string  :name, null: false
      t.string  :origin, null: false
      t.string  :destination, null: false
      t.string  :route_type, null: false, default: "standard"  # standard, ziyarat
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end