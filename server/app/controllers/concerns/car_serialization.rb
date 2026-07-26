module CarSerialization
  extend ActiveSupport::Concern

  # Seeded fleet images shipped in public/cars (survives Railway ephemeral disk).
  SEED_CAR_IMAGES = {
    "SR-1001" => "gmc.avif",
    "SR-1002" => "hiace.jpg",
    "SR-1003" => "sedan.avif",
    "SR-1004" => "staria.jpg",
    "SR-1005" => "h1.jpg"
  }.freeze

  private

  def serialize_car(car)
    car.as_json.merge(picture_url: car_picture_url(car))
  end

  def car_picture_url(car)
    candidates = []
    candidates << car.picture.filename.to_s if car.picture.attached?
    candidates << SEED_CAR_IMAGES[car.registration_number]

    candidates.compact.uniq.each do |filename|
      if Rails.public_path.join("cars", filename).exist?
        return "/cars/#{filename}"
      end
    end

    return rails_blob_path(car.picture, only_path: true) if car.picture.attached?

    nil
  end
end
