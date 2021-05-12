class Mutations::UnscanInventory < Mutations::BaseMutation
  argument :inventory_id, ID, required: true

  field :errors, [String], null: false

  def resolve(inventory_id:)    
    inventory = Inventory.find(inventory_id)

    if inventory
        quantity_needed = inventory.quantity_needed + 1
        invoiced_quantity = inventory.invoiced_quantity - 1
        scanned = invoiced_quantity == 0 ? false : true
        inventory.update(scanned: scanned, quantity_needed: quantity_needed, invoiced_quantity: invoiced_quantity)
        
        {
          errors: [],
        }

    else
      # Failed save, return the errors to the client
      {
        errors: ['No Product Found']
      }
    end

  end

end