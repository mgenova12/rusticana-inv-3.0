class Mutations::EditPrepcenterInventoryQuantityNeeded < Mutations::BaseMutation
  argument :prepcenter_id, Integer, required: true
  
  argument :inventory_input, [String], required: true

  field :errors, [String], null: false

  def resolve(prepcenter_id:, inventory_input:) 

    order = Prepcenter.find(prepcenter_id).orders.find_by(status: 'incomplete')

    eval(inventory_input[0]).each do |inventory_id, quantity|
      inventory = Inventory.find(inventory_id.to_s)

      if inventory.quantity.nil?
        inventory.update(quantity: quantity.to_i)
      end

      store_good = inventory.store_good
      store_good.update(amount_in_stock: quantity.to_i) 

      if store_good.count_by.name == '%'
        quantity.to_i <= 25 ? inventory.update(quantity_needed: 1, status: 'complete') : inventory.update(quantity_needed: 0, status: 'complete')
      elsif store_good.product.case_quantity && store_good.product.case_quantity > 0 && store_good.count_by.name == 'EA' && store_good.replenish_by == 'CASE'
        case_amount = store_good.max_amount - quantity.to_i
        case_result = (case_amount.to_f / store_good.product.case_quantity.to_f).ceil
        case_result > 0 ? inventory.update(quantity_needed: case_result, status: 'complete') : inventory.update(quantity_needed: 0, status: 'complete')
      else
        result = store_good.max_amount - quantity.to_i
        result > 0 ? inventory.update(quantity_needed: result, status: 'complete') : inventory.update(quantity_needed: 0, status: 'complete')
      end

    end

    order.update(status: 'pending')


    {
      errors: [],
    }

  end
end


