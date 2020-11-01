module Queries
  class StoreOrders < Queries::BaseQuery

    description 'Find all Store orders'

    type [Types::StoreOrderType], null: false

    def resolve
      StoreOrder.all.reverse
    end
    
  end
end