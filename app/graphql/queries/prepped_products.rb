module Queries
  class PreppedProducts < Queries::BaseQuery
    
    description 'Find all Prepped Products'

    type [Types::ProductType], null: false

    def resolve
      Product.where(prepped: true).order(:name)
    end

  end
end