class Mutations::DeleteDistributor < Mutations::BaseMutation
  argument :id, Integer, required: true

  field :distributor, Types::DistributorType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    distributor = Distributor.find(id)
    distributor.destroy
    
    {
      distributor: distributor,
      errors: []
    }

  end

end