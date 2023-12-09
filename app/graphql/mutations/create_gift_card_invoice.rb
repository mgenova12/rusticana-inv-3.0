class Mutations::CreateGiftCardInvoice< Mutations::BaseMutation
  argument :amount_paid, Float, required: true
  argument :store_id, Integer, required: true

  field :errors, [String], null: false

  def resolve(store_id:, amount_paid:)

    gift_card_invoice = GiftCardInvoice.new(
      store_id: store_id,
      amount_paid: amount_paid
    )

    if gift_card_invoice.save

      GiftCard.all.each do |g| 
        g.update(money_owed: 0)
      end

      # Successful creation, return the created object with no errors
      {
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        errors: gift_card_invoice.errors.full_messages
      }
    end
  end
end