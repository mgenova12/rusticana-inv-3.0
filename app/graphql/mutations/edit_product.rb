class Mutations::EditProduct < Mutations::BaseMutation
  argument :id, Integer, required: true
  argument :name, String, required: true
  argument :distributor_id, Integer, required: true
  argument :category_id, Integer, required: true
  argument :case_quantity, Integer, required: false
  argument :mark_up, Integer, required: true
  argument :price, Float, required: true

  field :product, Types::ProductType, null: false
  field :errors, [String], null: false

  def resolve(id:, name:, distributor_id:, category_id:, case_quantity:, mark_up:, price:)
    product = Product.find(id)
    marked_up_price = price + (price * (mark_up * 0.01))

    if product.update!(
      name: name,
      distributor_id: distributor_id, 
      category_id: category_id ,
      case_quantity: case_quantity,
      mark_up: mark_up,
      price: price, 
      marked_up_price: marked_up_price,
    )
      # Successful creation, return the created object with no errors
      {
        product: product,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        product: nil,
        errors: product.errors.full_messages
      }
    end
  end


end