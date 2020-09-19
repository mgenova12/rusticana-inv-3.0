module Types
  class QueryType < Types::BaseObject
    field :stores, resolver: Queries::Stores
    field :products, resolver: Queries::Products
  end
end
