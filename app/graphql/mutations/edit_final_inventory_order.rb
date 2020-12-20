class Mutations::EditFinalInventoryOrder < Mutations::BaseMutation
  argument :order_id, Integer, required: true
  argument :store_order_id, Integer, required: true

  field :errors, [String], null: false

  def resolve(order_id:, store_order_id:)
    order = Order.find(order_id)
    store_order = StoreOrder.find(store_order_id)

    if store_order.orders_complete >= 3
      store_order.update(status: 'Delivered')
    end

    scanned_inventories = Order.find(order_id).inventories.where(scanned: true).joins(:store_good).where(store_goods: { is_prepcenter: true })

    sale_total = 0
    scanned_inventories.each do |inventory|
      # multiplied by the invoiced quantiity?
      # what if 1/3 are scanned?
      total = inventory.store_good.product.marked_up_price * inventory.invoiced_quantity
      sale_total += total
    end 

    order.update(sale_total: sale_total, status: 'complete')

    {
      errors: []
    }

  end


end