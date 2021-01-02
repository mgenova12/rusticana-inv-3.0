class Mutations::CreateProduct < Mutations::BaseMutation
  argument :name, String, required: true
  argument :distributor_id, Integer, required: true
  argument :category_id, Integer, required: true
  argument :case_quantity, Integer, required: false
  argument :mark_up, Integer, required: true
  argument :price, Float, required: true
  argument :brand, String, required: false
  argument :unit_size, String, required: false
  argument :distributor_number, String, required: false
  argument :barcode, Integer, required: false
  argument :aisle_number, Integer, required: false
  argument :description, String, required: false
  argument :container_id, Integer, required: false

  field :product, Types::ProductType, null: false
  field :errors, [String], null: false

  def resolve(name:, distributor_id:, category_id:, case_quantity:, mark_up:, price:, brand:, unit_size:, distributor_number:, barcode:, aisle_number:, description:, container_id:)
    marked_up_price = price + (price * (mark_up * 0.01))

    product = Product.new(
      prepped: false,
      name: name,
      category_id: category_id,
      distributor_id: distributor_id,
      case_quantity: case_quantity,
      mark_up: mark_up, 
      price: price, 
      brand: brand, 
      unit_size: unit_size, 
      distributor_number: distributor_number, 
      barcode: barcode, 
      aisle_number: aisle_number, 
      description: description,
      marked_up_price: marked_up_price,
      container_id: container_id
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