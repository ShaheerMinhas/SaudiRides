class CreateCars < ActiveRecord::Migration[7.1]
  def change
    create_table :cars do |t|
      t.string  :name, null: false
      t.string  :model
      t.integer :capacity, null: false
      t.string  :registration_number, null: false
      t.boolean :is_available, default: true

      t.timestamps
    end
    add_index :cars, :registration_number, unique: true
  end
end