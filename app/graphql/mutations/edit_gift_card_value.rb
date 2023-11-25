class Mutations::EditGiftCardValue < Mutations::BaseMutation
  argument :card_number, String, required: true
  argument :value, Float, required: true
  argument :action, String, required: true
  argument :store_id, Integer, required: true
  argument :payment_method, String, required: false

  field :gift_card, Types::GiftCardType, null: false
  field :errors, [String], null: false

  def resolve(card_number:, value:, action:, store_id:, payment_method:)
    gift_card = GiftCard.find_by(card_number: card_number)
    if action == 'add'
      new_value = gift_card.amount + value
    else
      new_value = gift_card.amount - value

      if gift_card.store_id != store_id
        money_owed = gift_card.money_owed + value
        gift_card.update!(money_owed: money_owed)
      end
    end

    GiftCardChange.create!(
      change_value: value,
      change_event: action,
      store_id: store_id,
      gift_card_id: gift_card.id,
      payment_method: payment_method
    )

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