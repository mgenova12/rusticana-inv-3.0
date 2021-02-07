module Queries
  class GetStore < Queries::BaseQuery
    argument :store_id, Integer, required: true

    description 'Finds an store'

    type Types::StoreType, null: false

    def resolve(order_id:)
      Store.find(order_id)
    end

  end
end