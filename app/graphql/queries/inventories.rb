module Queries
  class Inventories < Queries::BaseQuery
    argument :store_id, Integer, required: true
    
    description 'Find a inventory for a store'

    type [Types::InventoryType], null: false

    def resolve(store_id:)
      Inventory.where(store_id: store_id, status: 'pending')
    end
  end
end