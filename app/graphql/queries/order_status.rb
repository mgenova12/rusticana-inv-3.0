module Queries
  class OrderStatus < Queries::BaseQuery
    argument :store_id, Integer, required: true
    
    description 'Find a incompelete Order for that store'

    type Types::OrderType, null: true

    def resolve(store_id:)
      Order.find_by(store_id: store_id, status: 'incomplete')
    end
  end

end
