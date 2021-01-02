class Mutations::EditPreppedProduct < Mutations::BaseMutation
  argument :id, Integer, required: true
  argument :name, String, required: true
  argument :category_id, Integer, required: true
  argument :container_id, Integer, required: false

  field :product, Types::ProductType, null: false
  field :errors, [String], null: false

  def resolve(id:, name:, category_id:, container_id:)
    product = Product.find(id)

    if product.update!(
      name: name,
      category_id: category_id ,
      container_id: container_id
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