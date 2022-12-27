class Mutations::EditGiftCardValue < Mutations::BaseMutation
  argument :card_number, String, required: true
  argument :value, Float, required: true
  argument :action, String, required: true

  field :gift_card, Types::GiftCardType, null: false
  field :errors, [String], null: false

  def resolve(card_number:, value:, action:)
    gift_card = GiftCard.find_by(card_number: card_number)

    if action == 'add'
      new_value = gift_card.amount + value
    else
      new_value = gift_card.amount - value
    end

    if gift_card.update(amount: new_value)
      # Successful creation, return the created object with no errors
      {
        gift_card: gift_card,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        gift_card: nil,
        errors: gift_card.errors.full_messages
      }
    end
  end


end