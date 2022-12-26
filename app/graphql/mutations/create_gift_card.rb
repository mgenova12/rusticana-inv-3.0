class Mutations::CreateGiftCard< Mutations::BaseMutation
  argument :card_number, String, required: true
  argument :amount, Float, required: true

  field :gift_card, Types::GiftCardType, null: false
  field :errors, [String], null: false

  def resolve(card_number:, amount:)

    gift_card = GiftCard.new(
      card_number: card_number,
      amount: amount
    )
    
    if gift_card.save
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