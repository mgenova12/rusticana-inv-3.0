module Types
  class CustomerType < Types::BaseObject
    field :id, ID, null: true
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :phone_number, String, null: true
    field :email, String, null: true
    field :created_at, String, null: true
  end
end