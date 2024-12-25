module Queries
  class Customers < Queries::BaseQuery
    
    description 'Find all Customers'

    type [Types::CustomerType], null: false

    def resolve
      Customer.all
    end

  end
end