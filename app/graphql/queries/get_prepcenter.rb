module Queries
  class GetPrepcenter < Queries::BaseQuery
    argument :prepcenter_id, Integer, required: true

    description 'Finds an prepcenter'

    type Types::PrepcenterType, null: false

    def resolve(prepcenter_id:)
      Prepcenter.find(prepcenter_id)
    end

  end
end