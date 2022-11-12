module Queries
  class Invoices < Queries::BaseQuery
    
    description 'Find all invoices'

    type [Types::OrderType], null: false

    def resolve
      Order.where(status: ['complete', 'PAID'], prepcenter_id: nil).where.not(sale_total: [nil, 0]).order(:created_at).reverse
    end
  end
end