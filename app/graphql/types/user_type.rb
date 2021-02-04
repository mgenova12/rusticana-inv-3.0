module Types
  class UserType < Types::BaseObject
    field :id, ID, null: true
    field :email, String, null: true
    field :first_name, String, null: true
    field :last_name, String, null: true
  end
end