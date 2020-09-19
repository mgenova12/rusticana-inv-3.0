module Queries
  class Products < Queries::BaseQuery
    
    description 'Find all non-prepped Product'

    type [Types::ProductType], null: false

    def resolve
      Product.where(prepped: false).order(:name)
    end

  end
end