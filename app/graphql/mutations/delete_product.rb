class Mutations::DeleteProduct < Mutations::BaseMutation
  argument :id, Integer, required: true

  field :product, Types::ProductType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    product = Product.find(id)
    product.destroy

    StoreGood.where(product_id: id).destroy_all
    
    {
      product: product,
      errors: []
    }

  end


end