class CreateCarRoutePricings < ActiveRecord::Migration[7.1]
  def change
    create_table :car_route_pricings do |t|
      t.references :car,   null: false, foreign_key: true
      t.references :route, null: false, foreign_key: true
      t.decimal :price, precision: 10, scale: 2, null: false

      t.timestamps
    end

    add_index :car_route_pricings, [:car_id, :route_id], unique: true
  end
end