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

    scanned_inventories = order.scanned_inventories

    scanned_inventories.each do |inventory|
      product = inventory.store_good_including_deleted.product

      if ([nil, 0].exclude?(product.case_quantity) && inventory.store_good_including_deleted.replenish_by != "CASE")
        total = (product.marked_up_price / product.case_quantity) * inventory.invoiced_quantity
        inventory.update_columns(invoiced_price: total.round(2), invoiced_product_price: product.marked_up_price)
      else
        total = product.marked_up_price * inventory.invoiced_quantity
        inventory.update_columns(invoiced_price: total.round(2), invoiced_product_price: product.marked_up_price)
      end
    end

    sum = scanned_inventories.sum(:invoiced_price)
    order.update(sale_total: sum.round(2), status: 'complete')

    {
      errors: []
    }

  end
end
