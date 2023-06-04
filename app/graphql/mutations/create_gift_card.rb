class Mutations::CreateGiftCard< Mutations::BaseMutation
  argument :card_number, String, required: true
  argument :amount, Float, required: true
  argument :store_id, Integer, required: true

  field :gift_card, Types::GiftCardType, null: true
  field :errors, [String], null: false

  def resolve(card_number:, amount:, store_id:)

    gift_card = GiftCard.new(
      card_number: card_number,
      amount: amount
    )

    if gift_card.save
      GiftCardChange.create!(
        change_value: amount,
        change_event: 'add',
        store_id: store_id,
        gift_card_id: gift_card.id
      )

      # Successful creation, return the created object with no errors
      {
        gift_card: gift_card,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        errors: gift_card.errors.full_messages
      }
    end
  end
end