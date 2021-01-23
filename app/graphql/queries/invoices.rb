module Queries
  class Invoices < Queries::BaseQuery
    
    description 'Find all invoices'

    type [Types::OrderType], null: false

    def resolve
      Order.where(status: ['complete', 'PAID']).reverse
    end
  end
end