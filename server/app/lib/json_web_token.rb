class JsonWebToken
  ALGORITHM = "HS256".freeze
  EXPIRATION = 24.hours

  def self.encode(payload)
    payload = payload.merge(exp: EXPIRATION.from_now.to_i)
    JWT.encode(payload, secret, ALGORITHM)
  end

  def self.decode(token)
    decoded = JWT.decode(token, secret, true, algorithm: ALGORITHM).first
    ActiveSupport::HashWithIndifferentAccess.new(decoded)
  end

  def self.secret
    Rails.application.secret_key_base
  end
end
