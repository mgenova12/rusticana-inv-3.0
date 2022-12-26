module Queries
  class GetGiftCard < Queries::BaseQuery
    argument :card_number, String, required: true

    description 'Find a gift card by card number'

    type Types::GiftCardType, null: false

    def resolve(card_number:)
      GiftCard.find_by(card_number: card_number)
    end

  end
end