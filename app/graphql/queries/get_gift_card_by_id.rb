module Queries
  class GetGiftCardById < Queries::BaseQuery
    argument :gift_card_id, Integer, required: true

    description 'Find a gift card by card ID'

    type Types::GiftCardType, null: true

    def resolve(gift_card_id:)
      GiftCard.find(gift_card_id)
    end

  end
end