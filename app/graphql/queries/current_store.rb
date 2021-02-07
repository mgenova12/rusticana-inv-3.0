module Queries
  class CurrentStore < Queries::BaseQuery
    argument :id, Integer, required: false
    argument :store_name, String, required: false

    description 'Find Store Name'

    type Types::StoreType, null: false

    def resolve(id:, store_name:)
      if store_name == "prepcenter"
        Prepcenter.find(id) 
      else
        Store.find(id)
      end

    end
  end
end