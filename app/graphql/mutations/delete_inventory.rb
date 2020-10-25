class Mutations::DeleteInventory < Mutations::BaseMutation
  argument :order_id, Integer, required: true

  field :errors, [String], null: false

  def resolve(order_id:)
    order = Order.find(order_id)
    inventories = order.inventories.where(status: 'pending')
    store_order = order.store_order

    store_order.decrement!(:orders_complete, 1)

    if store_order.orders_complete == 0 
      store_order.destroy
    end

    if order.destroy
      inventories.destroy_all
    end


    {
      errors: []
    }

  end


end