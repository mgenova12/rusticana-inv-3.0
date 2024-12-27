class Mutations::CreateCustomer< Mutations::BaseMutation
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :phone_number, String, required: true
  argument :email, String, required: true

  field :customer, Types::CustomerType, null: true
  field :errors, [String], null: false

  def resolve(first_name:, last_name:, phone_number:, email:)

    customer = Customer.new(
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email: email
    )

    if customer.save
      # Successful creation, return the created object with no errors
      {
        customer: customer,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        errors: customer.errors.full_messages
      }
    end
  end
end