module Queries
  class PrepcenterStoreGoods < Queries::BaseQuery
    argument :prepcenter_id, Integer, required: true
    
    description 'Find all Prepcenter Store Goods'

    type [Types::StoreGoodType], null: false

    def resolve(prepcenter_id:)
      StoreGood.where(prepcenter_id: prepcenter_id).order(:id)
    end
  end

end