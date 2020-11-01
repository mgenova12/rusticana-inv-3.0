module Queries
  class OrderInventories < Queries::BaseQuery
    argument :order_id, Integer, required: false

    description 'Find inventories for an order'

    type [Types::InventoryType], null: false

    def resolve(order_id:)
      Order.find(order_id).inventories.order(:created_at)
    end
    
  end
end