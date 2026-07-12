class CreateRouteStops < ActiveRecord::Migration[7.1]
  def change
    create_table :route_stops do |t|
      t.references :route, null: false, foreign_key: true
      t.string  :stop_name, null: false
      t.integer :stop_order, null: false, default: 1

      t.timestamps
    end
  end
end