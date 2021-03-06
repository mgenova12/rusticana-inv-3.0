class Mutations::EditStoreGood < Mutations::BaseMutation
  argument :id, Integer, required: true
  argument :max_amount, Integer, required: true
  argument :location_id, Integer, required: true
  argument :distributor_id, Integer, required: true
  argument :delivery_day, String, required: true
  argument :count_by_id, Integer, required: true
  argument :replenish_by, String, required: true
  argument :amount_in_stock, Integer, required: false
  argument :active, Boolean, required: false

  field :store_good, Types::StoreGoodType, null: false
  field :errors, [String], null: false

  def resolve(id:, location_id:, distributor_id:, max_amount:, replenish_by:, count_by_id:, delivery_day:, amount_in_stock:, active:)
    store_good = StoreGood.find(id)
    
    if store_good.update(
        location_id: location_id, 
        distributor_id: distributor_id,
        max_amount: max_amount,
        replenish_by: replenish_by,
        count_by_id: count_by_id,
        delivery_day: delivery_day,
        amount_in_stock: amount_in_stock,
        is_prepcenter: distributor_id == 5 ? true : false,
        active: active
      )
      # Successful creation, return the created object with no errors
      {
        store_good: store_good,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        store_good: nil,
        errors: store_good.errors.full_messages
      }
    end
  end


end