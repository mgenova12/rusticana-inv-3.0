class Mutations::CreateCustomer< Mutations::BaseMutation
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :phone_number, String, required: true
  argument :email, String, required: true
  argument :coupon_code, String, required: false

  field :customer, Types::CustomerType, null: true
  field :errors, [String], null: false

  def resolve(first_name:, last_name:, phone_number:, email:, coupon_code: nil)
    # Check if coupon_code already exists if provided
    if coupon_code.present?
      existing_coupon = Coupon.find_by(code: coupon_code)

      if existing_coupon
        # Check if coupon is already assigned to a customer
        customer_with_coupon = Customer.find_by(coupon_id: existing_coupon.id)

        if customer_with_coupon
          return {
            customer: nil,
            errors: ["Coupon already used"]
          }
        end
      else
        return {
          customer: nil,
          errors: ["Invalid coupon code"]
        }
      end
    end

    customer = Customer.new(
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email: email,
      coupon_id: existing_coupon&.id
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