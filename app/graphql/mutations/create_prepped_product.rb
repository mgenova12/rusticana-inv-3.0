class Mutations::CreatePreppedProduct < Mutations::BaseMutation
  argument :name, String, required: true
  argument :category_id, Integer, required: true
  argument :case_quantity, Integer, required: false
  argument :portion_size, Integer, required: true
  argument :barcode, Integer, required: false
  argument :mark_up, Integer, required: true
  argument :days_till_expire, Integer, required: false
  argument :description, String, required: false
  argument :p_id, Integer, required: true
  argument :price, Float, required: true

  field :product, Types::ProductType, null: false
  field :errors, [String], null: false

  def resolve(name:, category_id:, case_quantity:, portion_size:, barcode:, mark_up:, days_till_expire:, description:, p_id:, price:)
    marked_up_price = (price / portion_size) * (1 + (mark_up * 0.01))

    product = Product.new(
      prepped: true,
      name: name,
      category_id: category_id ,
      case_quantity: case_quantity,
      mark_up: mark_up, 
      barcode: barcode, 
      description: description,
      portion_size: portion_size,
      days_till_expire: days_till_expire,
      p_id: p_id,
      marked_up_price: marked_up_price
    )
    
    if product.save
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