module Queries
  class Invoice < Queries::BaseQuery
    argument :order_id, Integer, required: true
    
    description 'Find an invoice'

    type [Types::InventoryType], null: false

    def resolve(order_id:)
      Order.find(order_id).inventories.where(scanned: true).joins(:store_good).where(store_goods: { is_prepcenter: true })
    end
  end
end