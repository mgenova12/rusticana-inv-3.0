module Queries
  class GetOrder < Queries::BaseQuery
    argument :order_id, Integer, required: true

    description 'Finds an order'

    type Types::OrderType, null: false

    def resolve(order_id:)
      Order.find(order_id)
    end

  end
end