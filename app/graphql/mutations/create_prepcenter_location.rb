class Mutations::CreatePrepcenterLocation < Mutations::BaseMutation
  argument :name, String, required: true
  argument :prepcenter_id, Integer, required: true

  field :location, Types::LocationType, null: false
  field :errors, [String], null: false

  def resolve(name:, prepcenter_id:)

    location = Location.new(
      name: name,
      prepcenter_id: prepcenter_id,
    )
    
    if location.save
      # Successful creation, return the created object with no errors
      {
        location: location,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        location: nil,
        errors: location.errors.full_messages
      }
    end
  end
end