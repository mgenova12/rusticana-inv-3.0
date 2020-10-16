module Queries
  class Distributors < Queries::BaseQuery
    
    description 'Find all Distributors'

    type [Types::DistributorType], null: false

    def resolve
      Distributor.order("created_at DESC")
    end

  end
end