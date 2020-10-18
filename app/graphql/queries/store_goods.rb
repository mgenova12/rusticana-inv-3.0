module Queries
  class StoreGoods < Queries::BaseQuery
    argument :store_id, Integer, required: true
    
    description 'Find all Store Goods'

    type [Types::StoreGoodType], null: false

    def resolve(store_id:)
      StoreGood.where(store_id: store_id).order(:id)
    end
  end

end