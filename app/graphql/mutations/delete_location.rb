class Mutations::DeleteLocation < Mutations::BaseMutation
  argument :id, Integer, required: true

  field :location, Types::LocationType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    location = Location.find(id)
    location.destroy
    
    {
      location: location,
      errors: []
    }

  end

end