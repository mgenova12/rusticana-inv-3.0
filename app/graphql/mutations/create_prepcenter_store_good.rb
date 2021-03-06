class Mutations::CreatePrepcenterStoreGood < Mutations::BaseMutation
  argument :prepcenter_id, Integer, required: true
  argument :product_id, Integer, required: true
  argument :max_amount, Integer, required: true
  argument :location_id, Integer, required: true
  argument :distributor_id, Integer, required: true
  argument :count_by_id, Integer, required: true
  argument :replenish_by, String, required: true
  argument :delivery_day, String, required: true

  field :store_good, Types::StoreGoodType, null: false
  field :errors, [String], null: false

  def resolve(prepcenter_id:, product_id:, location_id:, distributor_id:, count_by_id:, max_amount:, replenish_by:, delivery_day:)
    store_good = StoreGood.new(
      prepcenter_id: prepcenter_id, 
      product_id: product_id,
      location_id: location_id,
      distributor_id: distributor_id,
      max_amount: max_amount,
      replenish_by: replenish_by,
      delivery_day: delivery_day,
      count_by_id: count_by_id,
    )

    if store_good.save
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