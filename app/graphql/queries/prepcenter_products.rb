module Queries
  class PrepcenterProducts < Queries::BaseQuery
    argument :prepcenter_id, Integer, required: true
    
    description 'Find all Prepcenter Products'

    type [Types::ProductType], null: false

    def resolve(prepcenter_id:)
      Product.all - Prepcenter.find(prepcenter_id).products
    end
  end

end