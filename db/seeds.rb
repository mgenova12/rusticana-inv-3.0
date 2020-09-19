# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'net/http'
require 'uri'
require 'json'

uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
request = Net::HTTP::Post.new(uri)
request.content_type = "application/json;charset=UTF-8"
request["Connection"] = "keep-alive"
request["Pragma"] = "no-cache"
request["Cache-Control"] = "no-cache"
request["Accept"] = "application/json, text/plain, */*"
request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
request["Origin"] = "https://still-badlands-25708.herokuapp.com"
request["Sec-Fetch-Site"] = "cross-site"
request["Sec-Fetch-Mode"] = "cors"
request["Sec-Fetch-Dest"] = "empty"
request["Referer"] = "https://still-badlands-25708.herokuapp.com/globals/products"
request["Accept-Language"] = "en-US,en;q=0.9"
request.body = JSON.dump({
  "query" => "{
  products {
    id
    name
    distributor {
      id
      name
    }
    category {
      id
      name
    }
    caseQuantity
    markUp
    price
    markedUpPrice
  }
}
"
})

req_options = {
  use_ssl: uri.scheme == "https",
}

response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
  http.request(request)
end

# response.code
JSON.parse(response.body)['data']['products'].each do |product|
  Product.create!(
    name: product['name'], 
    prepped: false,
    case_quantity: product['caseQuantity'],
    mark_up: product['markUp'],
    price: product['price']
  )
end









