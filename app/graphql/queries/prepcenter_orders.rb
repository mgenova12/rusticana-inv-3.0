module Queries
  class PrepcenterOrders < Queries::BaseQuery
    argument :prepcenter_id, Integer, required: false

    description 'Find all prepcenter orders'

    type [Types::OrderType], null: false

    def resolve(prepcenter_id:)
      Order.where(prepcenter_id: prepcenter_id).reverse
    end
    
  end
end
