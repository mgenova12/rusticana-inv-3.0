class Mutations::CreatePendingInventory < Mutations::BaseMutation
  argument :store_good_id, Integer, required: true
  argument :order_id, Integer, required: true
  argument :quantity, Integer, required: true

  field :errors, [String], null: false

  def resolve(store_good_id:, order_id:, quantity:)

    store_id = Order.find(order_id).store_id
    location_id = StoreGood.find(store_good_id).location_id

    Inventory.create!(
      store_good_id: store_good_id, 
      status: 'pending', 
      store_id: store_id, 
      quantity: quantity,
      order_id: order_id,
      location_id: location_id
    )

    {
      errors: []
    }

  end
end