# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2026_07_23_195718) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_hash"
    t.string "role"
    t.boolean "is_active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti"
    t.index ["jti"], name: "index_admins_on_jti", unique: true
  end

  create_table "booking_stops", force: :cascade do |t|
    t.bigint "booking_id", null: false
    t.string "stop_location", null: false
    t.integer "sequence_order", default: 1, null: false
    t.index ["booking_id"], name: "index_booking_stops_on_booking_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.bigint "route_id", null: false
    t.bigint "car_id", null: false
    t.bigint "driver_id"
    t.string "customer_name", null: false
    t.string "customer_phone", null: false
    t.string "customer_email", null: false
    t.string "pickup_location", null: false
    t.string "dropoff_location", null: false
    t.date "pickup_date", null: false
    t.time "pickup_time", null: false
    t.integer "passenger_count", null: false
    t.integer "luggage_count", default: 0
    t.text "special_instructions"
    t.boolean "has_multiple_stops", default: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.string "status", default: "new", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_bookings_on_car_id"
    t.index ["driver_id"], name: "index_bookings_on_driver_id"
    t.index ["route_id"], name: "index_bookings_on_route_id"
  end

  create_table "car_route_pricings", force: :cascade do |t|
    t.bigint "car_id", null: false
    t.bigint "route_id", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id", "route_id"], name: "index_car_route_pricings_on_car_id_and_route_id", unique: true
    t.index ["car_id"], name: "index_car_route_pricings_on_car_id"
    t.index ["route_id"], name: "index_car_route_pricings_on_route_id"
  end

  create_table "cars", force: :cascade do |t|
    t.string "name", null: false
    t.string "model"
    t.integer "capacity", null: false
    t.string "registration_number", null: false
    t.boolean "is_available", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "car_type", default: "Sedan", null: false
    t.index ["registration_number"], name: "index_cars_on_registration_number", unique: true
  end

  create_table "contact_messages", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone"
    t.text "message", null: false
    t.string "status", default: "new"
    t.datetime "created_at", null: false
  end

  create_table "drivers", force: :cascade do |t|
    t.string "name", null: false
    t.string "phone", null: false
    t.bigint "car_id"
    t.boolean "availability_status", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_drivers_on_car_id"
  end

  create_table "flight_details", force: :cascade do |t|
    t.bigint "booking_id", null: false
    t.string "flight_number", null: false
    t.string "airline_name", null: false
    t.string "flight_type", null: false
    t.datetime "scheduled_time", null: false
    t.index ["booking_id"], name: "index_flight_details_on_booking_id", unique: true
  end

  create_table "route_stops", force: :cascade do |t|
    t.bigint "route_id", null: false
    t.string "stop_name", null: false
    t.integer "stop_order", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["route_id"], name: "index_route_stops_on_route_id"
  end

  create_table "routes", force: :cascade do |t|
    t.string "name", null: false
    t.string "origin", null: false
    t.string "destination", null: false
    t.string "route_type", default: "standard", null: false
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "booking_stops", "bookings", on_delete: :cascade
  add_foreign_key "bookings", "cars"
  add_foreign_key "bookings", "drivers", on_delete: :nullify
  add_foreign_key "bookings", "routes"
  add_foreign_key "car_route_pricings", "cars"
  add_foreign_key "car_route_pricings", "routes"
  add_foreign_key "drivers", "cars", on_delete: :nullify
  add_foreign_key "flight_details", "bookings", on_delete: :cascade
  add_foreign_key "route_stops", "routes"
end
