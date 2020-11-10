class Mutations::ScanInventory < Mutations::BaseMutation
  argument :barcode, ID, required: true
  argument :order_id, Integer, required: true

  # field :location, Types::LocationType, null: false

  field :errors, [String], null: false

  def resolve(barcode:, order_id:)
    product_id = Product.find_by(barcode: barcode).id
    inventory = Order.find(order_id).inventories.joins({:store_good => :product }).find_by(store_goods: { product_id: product_id })

    quantity_needed = inventory.quantity_needed - 1
    invoiced_quantity = inventory.invoiced_quantity + 1
    inventory.update(scanned: true, quantity_needed: quantity_needed, invoiced_quantity: invoiced_quantity)

    {
      errors: []
    }

  end

end