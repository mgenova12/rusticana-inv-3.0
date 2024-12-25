module Queries
  class GiftCards < Queries::BaseQuery
    
    description 'Find all GiftCards'

    type [Types::GiftCardType], null: false

    def resolve
      GiftCard.order('created_at DESC')
    end
  end
end