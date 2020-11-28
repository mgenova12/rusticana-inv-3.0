module Queries
  class CombinedStoreOrders < Queries::BaseQuery
    argument :store_order_id, Integer, required: true

    description 'Find all Combined Store Orders'

    type [Types::ProductType], null: false

    def resolve(store_order_id:)
      Product.distinct.joins(:store_goods).where(store_goods: { is_prepcenter: true }).order(:name)
    end

  end
end