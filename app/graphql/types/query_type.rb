module Types
  class QueryType < Types::BaseObject
    field :stores, resolver: Queries::Stores
    field :products, resolver: Queries::Products
    field :distributors, resolver: Queries::Distributors
    field :categories, resolver: Queries::Categories
    field :prepcenters, resolver: Queries::Prepcenters
  end
end
