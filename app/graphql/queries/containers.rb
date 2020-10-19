module Queries
  class Containers < Queries::BaseQuery
    
    description 'Find all Containers'

    type [Types::ContainerType], null: false

    def resolve
      Container.all
    end

  end
end