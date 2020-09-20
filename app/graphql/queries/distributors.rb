module Queries
  class Distributors < Queries::BaseQuery
    
    description 'Find all Distributors'

    type [Types::DistributorType], null: false

    def resolve
      Distributor.all
    end

  end
end