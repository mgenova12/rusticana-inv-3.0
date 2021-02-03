module Queries
  class CombinedStoreOrders < Queries::BaseQuery

    description 'Find all Products'

    type [Types::ProductType], null: false

    def resolve
      # Prepcenter.first.products
      Product.distinct.joins(:store_goods).where(store_goods: { is_prepcenter: true }).order(:name)
    end

  end
end
