class Mutations::ScanInventory < Mutations::BaseMutation
  argument :barcode, Float, required: true
  argument :order_id, Integer, required: true

  field :errors, [String], null: false

  def resolve(barcode:, order_id:)
    product = Product.find_by(barcode: barcode)
    
    if product
      inventory = Order.find(order_id).inventories.joins({:store_good => :product }).find_by(store_goods: { product_id: product.id })
      
      if inventory.quantity_needed > 0
        quantity_needed = inventory.quantity_needed - 1
        invoiced_quantity = inventory.invoiced_quantity + 1
        inventory.update(scanned: true, quantity_needed: quantity_needed, invoiced_quantity: invoiced_quantity)
        
        {
          errors: [],
        }
      else
        {
          errors: ['No Product Found']
        }
      end
    else
      # Failed save, return the errors to the client
      {
        errors: ['No Product Found']
      }
    end

  end

end