module Queries
  class StoreOrders < Queries::BaseQuery

    description 'Find all Store orders'

    type [Types::StoreOrderType], null: false

    def resolve
      StoreOrder.order(:delivery_date).reverse
    end
    
  end
end