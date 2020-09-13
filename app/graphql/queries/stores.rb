module Queries
  class Stores < Queries::BaseQuery
    
    description 'Find all Stores'

    type [Types::StoreType], null: false

    def resolve
      Store.all
    end

  end
end