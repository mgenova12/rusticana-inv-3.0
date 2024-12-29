class RusticanaInv30Schema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  # use GraphQL::Execution::Interpreter
  # use GraphQL::Analysis::AST

  # Add built-in connections for pagination
  # use GraphQL::Pagination::Connections

  # def self.execute(query, variables: {}, context: {}, operation_name: nil)
  #   result = super(query, variables: variables, context: context, operation_name: operation_name)

  #   # Add success_message at the root level, if it exists in the mutation response
  #   if result['data']
  #     success_message = nil

  #     # If the mutation response includes success_message, inject it at the root level
  #     if result['data'].values.any? { |field| field.is_a?(Hash) && field['successMessage'] }
  #       success_message = result['data'].values.find { |field| field.is_a?(Hash) && field['successMessage'] }['successMessage']
  #     end
  #     result['data']['successMessage'] = success_message
  #   end

  #   result
  # end
end
