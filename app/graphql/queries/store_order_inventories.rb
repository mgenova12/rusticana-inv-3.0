module Queries
  class StoreOrderInventories < Queries::BaseQuery
    argument :order_id, Integer, required: true

    description 'Find all store order inventories'

    type [Types::InventoryType], null: false

    def resolve(order_id:)
      # order_ids = StoreOrder.find(store_order_id).orders.ids
      # Order.find(order_id).inventories.joins(store_goods: { distributor_id: 11 })
      Order.find(order_id).inventories.joins({:store_good => :distributor }).where(store_goods: { distributor_id: 11 })
    end

  end
end