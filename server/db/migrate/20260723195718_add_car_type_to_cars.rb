class AddCarTypeToCars < ActiveRecord::Migration[7.1]
  def change
    add_column :cars, :car_type, :string, null: false, default: "Sedan"
  end
end
