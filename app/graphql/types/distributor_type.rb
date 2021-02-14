module Types
  class DistributorType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :row_order, Integer, null: true
  end
end