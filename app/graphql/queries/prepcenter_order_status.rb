module Queries
  class PrepcenterOrderStatus < Queries::BaseQuery
    argument :prepcenter_id, Integer, required: true
    
    description 'Find a incompelete Order for that prepcenter'

    type Types::OrderType, null: true

    def resolve(prepcenter_id:)
      Order.find_by(prepcenter_id: prepcenter_id, status: 'incomplete')
    end
  end

end
