module Queries
  class GetStore < Queries::BaseQuery
    argument :store_id, Integer, required: true

    description 'Finds an store'

    type Types::StoreType, null: false

    def resolve(store_id:)
      Store.find(store_id)
    end

  end
end