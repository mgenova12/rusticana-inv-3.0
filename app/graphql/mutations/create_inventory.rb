class Mutations::CreateInventory < Mutations::BaseMutation
  argument :store_id, Integer, required: true
  argument :delivery_day, String, required: true

  field :errors, [String], null: false

  def resolve(store_id:, delivery_day:) 
    store = Store.find(store_id)
    store_goods = store.store_goods.where(delivery_day: [delivery_day, 'Both'])

    date = Date.today
    if delivery_day == 'Tuesday'
      delivery_date = date += 1 + ((2-date.wday) % 7)
    else
      delivery_date = date += 1 + ((5-date.wday) % 7)
    end

    order = Order.create!(store_id: store_id, delivery_day: delivery_day, status: 'incomplete')

    store_order = StoreOrder.last

    if store_order.nil? || store_order.orders_complete == Store.all.size
      store_order = StoreOrder.create!(delivery_date: delivery_date, status:'Prepping', orders_complete: 1)
      order.update(store_order_id: store_order.id)
    else
      store_order.increment!(:orders_complete, 1)
      order.update(store_order_id: store_order.id)
    end

    store_goods.each do |store_good|
      Inventory.create!(
        store_good_id: store_good.id, 
        status: 'pending', 
        store_id: store_id, 
        location_id: store_good.location_id,
        order_id: order.id
      )
    end


    {
      errors: []
    }


  end
end
