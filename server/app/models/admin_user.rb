class AdminUser < ApplicationRecord
  self.table_name = "admins"

  attr_accessor :password

  before_create :set_jti
  before_create :set_default_active_state
  before_save :hash_password, if: -> { password.present? }

  validates :name, :email, presence: true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 8 }, on: :create

  def authenticate(unencrypted_password)
    return false if password_hash.blank?

    BCrypt::Password.new(password_hash) == unencrypted_password && self
  end

  def rotate_jti!
    update!(jti: SecureRandom.uuid)
  end

  private

  def hash_password
    self.password_hash = BCrypt::Password.create(password)
  end

  def set_jti
    self.jti ||= SecureRandom.uuid
  end

  def set_default_active_state
    self.is_active = true if is_active.nil?
  end
end
