module Types
  class QueryType < Types::BaseObject
    field :stores, resolver: Queries::Stores

  end
end
