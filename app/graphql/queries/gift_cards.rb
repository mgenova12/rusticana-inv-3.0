module Queries
  class GiftCards < Queries::BaseQuery
    
    description 'Find all GiftCards'

    type [Types::GiftCardType], null: false

    def resolve
      GiftCard.all.reverse
    end
  end
end