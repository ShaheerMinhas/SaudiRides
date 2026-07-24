class ContactMessagesController < ApplicationController
  def create
    contact_message = ContactMessage.new(contact_message_params)
    if contact_message.save
      render json: contact_message, status: :created
    else
      render json: { errors: contact_message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def contact_message_params
    params.require(:contact_message).permit(:name, :email, :phone, :message)
  end
end
