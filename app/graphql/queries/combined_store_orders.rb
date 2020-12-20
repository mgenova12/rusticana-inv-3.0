module Queries
  class CombinedStoreOrders < Queries::BaseQuery

    description 'Find all Products'

    type [Types::ProductType], null: false

    def resolve
      # Product.distinct.joins(:store_goods).where(store_goods: { is_prepcenter: true }).order(:name)

      # should this only be prepcenter store good products?
      Product.order(:name)
    end

  end
end