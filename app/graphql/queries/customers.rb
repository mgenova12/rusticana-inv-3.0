module Queries
  class Customers < Queries::BaseQuery
    
    description 'Find all Customers'

    type [Types::CustomerType], null: false

    def resolve
      Customer.order('created_at DESC')
    end

  end
end