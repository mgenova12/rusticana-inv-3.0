class Mutations::DeletePendingInventory < Mutations::BaseMutation
  argument :inventory_id, Integer, required: true

  field :errors, [String], null: false

  def resolve(inventory_id:)
    inventory = Inventory.find(inventory_id)
    inventory.destroy
    
    {
      inventory: inventory,
      errors: []
    }

  end

end