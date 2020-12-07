module Queries
  class StoreOrderInventories < Queries::BaseQuery
    argument :order_id, Integer, required: true

    description 'Find all store order inventories'

    type [Types::InventoryType], null: false

    def resolve(order_id:)
      Order.find(order_id).inventories.joins(:store_good).where(store_goods: { is_prepcenter: true })
    end

  end
end