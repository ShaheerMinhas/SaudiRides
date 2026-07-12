# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

cars = [
  { name: "GMC Yukon", model: "2023", capacity: 7, registration_number: "SR-1001" },
  { name: "Toyota Hiace", model: "2022", capacity: 12, registration_number: "SR-1002" },
  { name: "Toyota Camry", model: "2024", capacity: 4, registration_number: "SR-1003" },
  { name: "Mercedes Sprinter", model: "2023", capacity: 15, registration_number: "SR-1004" }
].map { |attrs| Car.find_or_create_by!(registration_number: attrs[:registration_number]) { |c| c.assign_attributes(attrs) } }

routes = [
  {
    name: "Jeddah Airport - Makkah Hotel",
    origin: "Jeddah Airport",
    destination: "Makkah",
    route_type: "standard",
    stops: []
  },
  {
    name: "Madinah Airport - Madinah Hotel",
    origin: "Madinah Airport",
    destination: "Madinah",
    route_type: "standard",
    stops: []
  },
  {
    name: "Makkah Ziyarat Tour",
    origin: "Makkah",
    destination: "Makkah",
    route_type: "ziyarat",
    stops: ["Jabal al-Noor", "Cave of Hira", "Jabal Thawr", "Masjid Aisha"]
  },
  {
    name: "Madinah Ziyarat Tour",
    origin: "Madinah",
    destination: "Madinah",
    route_type: "ziyarat",
    stops: ["Quba Mosque", "Mount Uhud", "Masjid Qiblatain", "Al-Baqi Cemetery"]
  }
].map do |attrs|
  route = Route.find_or_create_by!(name: attrs[:name]) do |r|
    r.origin = attrs[:origin]
    r.destination = attrs[:destination]
    r.route_type = attrs[:route_type]
  end

  attrs[:stops].each_with_index do |stop_name, index|
    RouteStop.find_or_create_by!(route: route, stop_name: stop_name) { |s| s.stop_order = index + 1 }
  end

  route
end

cars.each do |car|
  routes.each do |route|
    base_price = route.route_type == "ziyarat" ? 100 : 60
    price = base_price + (car.capacity * 5)
    CarRoutePricing.find_or_create_by!(car: car, route: route) { |p| p.price = price }
  end
end

puts "Seeded #{Car.count} cars, #{Route.count} routes, #{RouteStop.count} route_stops, #{CarRoutePricing.count} car_route_pricings"
