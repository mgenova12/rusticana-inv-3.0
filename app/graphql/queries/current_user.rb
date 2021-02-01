module Queries
  class CurrentUser < Queries::BaseQuery
    
    description 'Finds the current user'

    type Types::UserType, null: false

    def resolve

      if context[:current_user]
        context[:current_user]
      else
        raise GraphQL::ExecutionError, "You need to authenticate to perform this action"
      end

    end
  end

end