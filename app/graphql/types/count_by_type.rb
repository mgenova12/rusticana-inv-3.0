module Types
  class CountByType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
  end
end