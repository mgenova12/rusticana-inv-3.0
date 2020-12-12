module Queries
  class UnscannedStoreOrderInventories < Queries::BaseQuery
    argument :order_id, Integer, required: true

    description 'Find all unscanned store order inventories'

    type [Types::InventoryType], null: false

    def resolve(order_id:)

      Order.find(order_id).inventories.where(scanned: [nil,false]).joins(:store_good).where(store_goods: { is_prepcenter: true })
    end

  end
end