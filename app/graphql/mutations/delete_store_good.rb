class Mutations::DeleteStoreGood < Mutations::BaseMutation
  argument :id, Integer, required: true

  field :store_good, Types::StoreGoodType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    store_good = StoreGood.find(id)
    store_good.destroy
    
    {
      store_good: store_good,
      errors: []
    }

  end


end