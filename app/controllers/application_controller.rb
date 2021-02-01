class ApplicationController < ActionController::API
  private

  def current_user
    token = request.headers["Authorization"].to_s
    puts 'token'
    puts token
    # email = Base64.decode64(token)
    # User.find_by(email: email)
  end  
end
