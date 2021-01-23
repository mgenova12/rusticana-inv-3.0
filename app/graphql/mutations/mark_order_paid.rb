class Mutations::MarkOrderPaid < Mutations::BaseMutation
  argument :orderIds, [Integer], required: true

  field :errors, [String], null: false

  def resolve(orderIds:)

    orderIds.each do |orderId|
      Order.find(orderId).update(status: 'PAID')
    end

    {
      errors: []
    }

  end

end