module Types
  class StoreType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
  end
end