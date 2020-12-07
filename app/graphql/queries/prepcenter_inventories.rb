module Queries
  class PrepcenterInventories < Queries::BaseQuery
    argument :prepcenter_id, Integer, required: true
    
    description 'Find a inventory for a prepcenter'

    type [Types::InventoryType], null: false

    def resolve(prepcenter_id:)
      Inventory.where(prepcenter_id: prepcenter_id, status: 'pending').order(:created_at)
    end
  end
end