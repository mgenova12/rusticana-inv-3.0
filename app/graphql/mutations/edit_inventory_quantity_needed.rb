class Mutations::EditInventoryQuantityNeeded < Mutations::BaseMutation
  argument :order_id, Integer, required: true
  argument :inventory_input, [String], required: true

  field :errors, [String], null: false

  def resolve(order_id:, inventory_input:)
    submitted_inventory = eval(inventory_input[0])
    order = Order.find(order_id)

    submitted_inventory.each do |inventory_id, quantity|
      found_inventory = order.inventories.find_by(id: inventory_id.to_s)

      if found_inventory && found_inventory.quantity.nil?
        found_inventory.update(quantity: quantity.to_i)
      end
    end

    if order.inventories.where(quantity: nil).size > 0
      {
        errors: ['You must fill out all fields!']
      }
    else
      order.inventories.each do |inventory|
        store_good = inventory.store_good
        store_good.update(amount_in_stock: inventory.quantity)
        #modified invoiced_quantity/quantity_needed and scanned(temporary)
        if store_good.count_by.name == '%'
          inventory.quantity <= 25 ? inventory.update(quantity_needed: 0, invoiced_quantity: 1, status: 'complete', scanned: true) : inventory.update(quantity_needed: 0, status: 'complete')
        elsif store_good.product.case_quantity && store_good.product.case_quantity > 0 && store_good.count_by.name == 'EA' && store_good.replenish_by == 'CASE'
          case_amount = store_good.max_amount - inventory.quantity
          case_result = (case_amount.to_f / store_good.product.case_quantity.to_f).ceil
          case_result > 0 ? inventory.update(quantity_needed: 0, invoiced_quantity: case_result, status: 'complete', scanned: true) : inventory.update(quantity_needed: 0, status: 'complete')
        else
          result = store_good.max_amount - inventory.quantity
          result > 0 ? inventory.update(quantity_needed: 0, invoiced_quantity:result, status: 'complete', scanned: true) : inventory.update(quantity_needed: 0, status: 'complete')
        end
      end

      order.update(status: 'pending')
    
      {
        errors: [],
      }
    end

  end
end


