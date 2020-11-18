module Queries
  class PrepcenterLocations < Queries::BaseQuery
    argument :prepcenter_id, Integer, required: true
    
    description 'Find a Location for a prepcenter'

    type [Types::LocationType], null: false

    def resolve(prepcenter_id:)
      Location.where(prepcenter_id: prepcenter_id).order(:row_order)
    end
  end
end