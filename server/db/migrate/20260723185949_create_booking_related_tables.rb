class CreateBookingRelatedTables < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      # selections
      t.references :route, null: false, foreign_key: true
      t.references :car,   null: false, foreign_key: true
      t.references :driver, foreign_key: { on_delete: :nullify }

      # customer info (captured at checkout)
      t.string :customer_name, null: false
      t.string :customer_phone, null: false
      t.string :customer_email, null: false

      # trip requirements
      t.string  :pickup_location, null: false
      t.string  :dropoff_location, null: false
      t.date    :pickup_date, null: false
      t.time    :pickup_time, null: false
      t.integer :passenger_count, null: false
      t.integer :luggage_count, default: 0
      t.text    :special_instructions
      t.boolean :has_multiple_stops, default: false

      # pricing
      t.decimal :price, precision: 10, scale: 2, null: false

      # status
      t.string :status, null: false, default: "new"  # new, in_progress, complete, cancelled

      t.timestamps
    end

    create_table :booking_stops do |t|
      t.references :booking, null: false, foreign_key: { on_delete: :cascade }
      t.string  :stop_location, null: false
      t.integer :sequence_order, null: false, default: 1
    end

    create_table :flight_details do |t|
      t.references :booking, null: false, foreign_key: { on_delete: :cascade }, index: { unique: true }
      t.string    :flight_number, null: false
      t.string    :airline_name, null: false
      t.string    :flight_type, null: false  # arrival, departure
      t.datetime  :scheduled_time, null: false
    end

    create_table :contact_messages do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone
      t.text   :message, null: false
      t.string :status, default: "new"  # new, responded, closed

      t.datetime :created_at, null: false
    end
  end
end
