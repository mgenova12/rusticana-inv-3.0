module Queries
  class Prepcenters < Queries::BaseQuery
    
    description 'Find all Prepcenters'

    type [Types::PrepcenterType], null: false

    def resolve
      Prepcenter.all
    end

  end
end