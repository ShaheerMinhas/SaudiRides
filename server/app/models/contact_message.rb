class ContactMessage < ApplicationRecord
  STATUSES = %w[new responded closed].freeze

  validates :name, :email, :message, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :status, inclusion: { in: STATUSES }
end
