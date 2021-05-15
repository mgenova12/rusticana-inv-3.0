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

    scanned_inventories = Order.find(order_id).scanned_inventories

    sale_total = 0
    scanned_inventories.each do |inventory|
      product = inventory.store_good.product

      if (product.case_quantity && inventory.store_good.count_by == "EA")
        total = (product.marked_up_price / product.case_quantity) * inventory.invoiced_quantity
        inventory.update(invoiced_price: total, invoiced_product_price: product.marked_up_price)
      else
        total = product.marked_up_price * inventory.invoiced_quantity
        inventory.update(invoiced_price: total, invoiced_product_price: product.marked_up_price)
      end
      sale_total += total
    end 

    order.update(sale_total: sale_total, status: 'complete')

    {
      errors: []
    }

  end


end