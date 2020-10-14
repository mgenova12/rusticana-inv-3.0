class Mutations::LoginUser < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :user, Types::UserType, null: false
  field :token, String, null: false
  field :errors, [String], null: false

  def resolve(email:, password:)
    user = User.find_by(email: email)
    
    return unless user
    return unless user.authenticate(password)

    payload = {user_id: user.id}
    token = JWT.encode(payload, ENV['SECRET_KEY_BASE'] )
    
    {
      user: user,
      token: token,
      errors: [],
    }

  end


end