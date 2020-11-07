module Queries
  class CombinedStoreOrders < Queries::BaseQuery
    argument :store_order_id, Integer, required: true

    description 'Find all Combined Store Orders'

    type [Types::ProductType], null: false

    def resolve(store_order_id:)
      # order_ids = StoreOrder.find(store_order_id).orders.ids
      # Inventory.where(order_id: order_ids)
      # Product.all
      Product.joins(:store_goods).where(store_goods: { distributor_id: 11 })
    end

  end
end