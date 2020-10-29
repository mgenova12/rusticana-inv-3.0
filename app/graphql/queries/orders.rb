module Queries
  class Orders < Queries::BaseQuery
    argument :store_id, Integer, required: false

    description 'Find all orders'

    type [Types::OrderType], null: false

    def resolve(store_id:)
      Order.where(store_id: store_id).reverse
    end
    
  end
end