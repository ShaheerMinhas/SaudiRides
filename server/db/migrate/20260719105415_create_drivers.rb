class CreateDrivers < ActiveRecord::Migration[7.1]
  def change
    create_table :drivers do |t|
      t.string  :name, null: false
      t.string  :phone, null: false
      t.references :car, foreign_key: { on_delete: :nullify }
      t.boolean :availability_status, default: true

      t.timestamps
    end
  end
end
