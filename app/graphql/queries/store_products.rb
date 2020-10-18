module Queries
  class StoreProducts < Queries::BaseQuery
    argument :store_id, Integer, required: true
    
    description 'Find all Store Products'

    type [Types::ProductType], null: false

    def resolve(store_id:)
      Product.all - Store.find(store_id).products
    end
  end

end