class Mutations::EditInventoryQuantity < Mutations::BaseMutation
  argument :inventory_id, Integer, required: true
  argument :quantity, Integer, required: true

  field :inventory, Types::InventoryType, null: false
  field :errors, [String], null: false

  def resolve(inventory_id:, quantity:)
    inventory = Inventory.find(inventory_id)


    if inventory.update(quantity: quantity)
      # Successful creation, return the created object with no errors
      {
        inventory: inventory,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        inventory: nil,
        errors: inventory.errors.full_messages
      }
    end
  end


end