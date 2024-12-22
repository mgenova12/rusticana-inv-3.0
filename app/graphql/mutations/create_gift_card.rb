class Mutations::CreateGiftCard< Mutations::BaseMutation
  argument :card_number, String, required: true
  argument :amount, Float, required: true
  argument :store_id, Integer, required: true
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :phone_number, String, required: true
  argument :email, String, required: true
  argument :payment_method, String, required: true

  field :gift_card, Types::GiftCardType, null: true
  field :errors, [String], null: false

  def resolve(card_number:, amount:, store_id:, first_name:, last_name:, phone_number:, email:, payment_method:)
    found_customer = Customer.find_by(first_name: first_name.strip, last_name: last_name.strip)

    if !found_customer
      found_customer = Customer.create!(
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email: email
      )
    end

    gift_card = GiftCard.new(
      card_number: card_number,
      amount: amount,
      store_id: store_id,
      money_owed: 0,
      customer_id: found_customer.id
    )

    if gift_card.save
      GiftCardChange.create!(
        change_value: amount,
        change_event: 'add',
        store_id: store_id,
        gift_card_id: gift_card.id,
        payment_method: payment_method
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