class Mutations::CreatePrepcenterInventory < Mutations::BaseMutation
  argument :prepcenter_id, Integer, required: true
  argument :delivery_day, String, required: true

  field :errors, [String], null: false

  def resolve(prepcenter_id:, delivery_day:)
    prepcenter = Prepcenter.find(prepcenter_id)
    order = Order.create!(prepcenter_id: prepcenter_id, delivery_day: delivery_day, status: 'incomplete')
    store_goods = prepcenter.store_goods.where(delivery_day: [delivery_day, 'Both'], active: true)
    
    store_goods.each do |store_good|
      Inventory.create!(
        store_good_id: store_good.id, 
        status: 'pending', 
        prepcenter_id: prepcenter_id, 
        location_id: store_good.location_id,
        order_id: order.id
      )
    end


    {
      errors: []
    }


  end
end
