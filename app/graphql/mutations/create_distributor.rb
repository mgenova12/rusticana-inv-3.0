class Mutations::CreateDistributor < Mutations::BaseMutation
  argument :name, String, required: true

  field :distributor, Types::DistributorType, null: false
  field :errors, [String], null: false

  def resolve(name:)

    distributor = Distributor.new(
      name: name,
    )
    
    if distributor.save
      # Successful creation, return the created object with no errors
      {
        distributor: distributor,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        distributor: nil,
        errors: distributor.errors.full_messages
      }
    end
  end
end