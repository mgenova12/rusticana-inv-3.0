module Queries
  class GetGiftCardChanges < Queries::BaseQuery
    argument :gift_card_id, Integer, required: true

    description 'Find a gift card changes'

    type [Types::GiftCardChangeType], null: true

    def resolve(gift_card_id:)
      GiftCardChange.where(gift_card_id: gift_card_id).reverse
    end

  end
end