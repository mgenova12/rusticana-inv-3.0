class Mutations::CreateQuickOrder < Mutations::BaseMutation
  argument :store_id, Integer, required: true

  field :errors, [String], null: false
  field :order, Types::OrderType, null: false

  def resolve(store_id:)
    order = Order.create!(store_id: store_id, status: 'incomplete', is_quick_order: true)

    {
      order: order,
      errors: []
    }

  end
end
