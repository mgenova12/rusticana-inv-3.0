module Queries
  class CountBies < Queries::BaseQuery
    
    description 'Find all CountBies'

    type [Types::CountByType], null: false

    def resolve
      CountBy.all
    end

  end
end