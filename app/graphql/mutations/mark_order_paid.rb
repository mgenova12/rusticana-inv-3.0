class Mutations::MarkOrderPaid < Mutations::BaseMutation
  argument :order_ids, [Integer], required: true

  field :errors, [String], null: false

  def resolve(order_ids:)

    order_ids.each do |order_id|
      Order.find(order_id).update(status: 'PAID')
    end

    {
      errors: []
    }

  end

end