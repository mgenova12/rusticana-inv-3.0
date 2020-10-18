module Queries
  class Locations < Queries::BaseQuery
    argument :store_id, Integer, required: true
    
    description 'Find a Location for a store'

    type [Types::LocationType], null: false

    def resolve(store_id:)
      Location.where(store_id: store_id).order(:row_order)
    end
  end
end