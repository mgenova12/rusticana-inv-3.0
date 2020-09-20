module Queries
  class Categories < Queries::BaseQuery
    
    description 'Find all Categories'

    type [Types::CategoryType], null: false

    def resolve
      Category.all
    end

  end
end