# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# Product.all.each{|x| x.update(barcode:rand(10 ** 9...10 ** 10))}
# Prepcenter.first.store_goods.where(is_prepcenter:true).update_all(is_prepcenter:false)

# StoreGood.where(prepcenter_id: 1).select(:product_id).group(:product_id).having('count(*) > 1').size

# StoreGood.where(distributor_id: 5).update_all(is_prepcenter: true)

# Container.create(name: "NO CONTAINER")
# Product.update_all(container_id: 9)

# Prepcenter.create(name:'Trappe')
# Store.create(name: "Dover Road", prepcenter_id: 1)
# Store.create(name: "Easton Bypass", prepcenter_id: 1)
# Store.create(name: "Cambridge", prepcenter_id: 1)

# d = [
#   "HOLT",
#   "WALMART",
#   "SYSCO",
#   "US FOODS", 
#   "TRAPPE",
#   "JETRO [RESTAURANT DEPOT]",
#   "FERRARA FOODS",
#   "TEDDY BEAR FRESH",
#   "AMAZON",
#   "SAMS CLUB",
#   "WALMART",
#   "WEBSTAURANT STORE",
#   "COCA COLA"
# ]
# d.each do |x|
#   Distributor.create!(name:x)
# end

# cat = ["Dry", "Frozen", "Refrigerated"]
# cat.each do |x|
#   Category.create!(name:x)
# end

# cb = ['%', 'EA', 'BIN', 'SLEEVE', 'CASE']
# cb.each do |x|
#   CountBy.create!(name:x)
# end

# con = ['GREEN', 'RED','GREY','BLUE','BASKET','BULK FROZEN','BULK DRY','BULK REFRIGERATED']
# con.each do |x|
#   Container.create!(name:x)
# end

# require 'net/http'
# require 'uri'
# require 'json'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   products {
#     id
#     name
#     distributor {
#       id
#       name
#     }
#     category {
#       id
#       name
#     }
#     caseQuantity
#     markUp
#     price
#     markedUpPrice
#     brand
#     daysTillExpire
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# products = JSON.parse(response.body)['data']['products']

# products.each do |product|
#   dis = Distributor.find_by(name:product['distributor']['name'])
#   cat = Category.find_by(name:product['category']['name'])

#   Product.create!(
#     prepped: false,
#     name: product['name'],
#     case_quantity: product['caseQuantity'],
#     mark_up: product['markUp'],
#     price: product['price'],
#     marked_up_price: product['markedUpPrice'],  
#     distributor_id: dis.id,
#     category_id: cat.id,
#     brand: product['brand'],
#     days_till_expire: product['daysTillExpire']
#   )  
# end

# ######################################################################## preppedProducts

# require 'net/http'
# require 'uri'
# require 'json'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   preppedProducts {
#     id
#     name
#     category {
#       id
#       name
#     }
#     portionSize
#     caseQuantity
#     markUp
#     markedUpPrice
#     brand
#     daysTillExpire    
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# prepped_products = JSON.parse(response.body)['data']['preppedProducts']

# prepped_products.each do |prepped_product|
#   cat = Category.find_by(name: prepped_product['category']['name'])
  
#   Product.create!(
#     prepped: true,
#     name: prepped_product['name'],
#     portion_size: prepped_product['portionSize'],
#     case_quantity: prepped_product['caseQuantity'],
#     mark_up: prepped_product['markUp'],
#     marked_up_price: prepped_product['markedUpPrice'],
#     category_id: cat.id,
#     brand: prepped_product['brand'],
#     days_till_expire: prepped_product['daysTillExpire']
#   )
# end

# ######################################################################## BYPASS LOCATIONS

# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   locations(storeId: 3) {
#     id
#     name
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# bypass_locations = JSON.parse(response.body)['data']['locations']

# bypass_locations.each do |bypass_location|
#   Location.create!(
#     name: bypass_location['name'],
#     store_id: 2
#   )
# end

# ######################################################################## BYPASS STOREGOODS

# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   getStoreGoods(id: 3) {
#     id
#     deliveryDay
#     maxAmount
#     replenishBy
#     countBy {
#       id
#       name
#     }
#     distributor {
#       id
#       name
#     }
#     location {
#       id
#       name
#     }
#     product {
#       id
#       name
#     }
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# bypass_store_goods = JSON.parse(response.body)['data']['getStoreGoods']

# bypass_store_goods.each do |bypass_store_good|
#   countBy = CountBy.find_by(name: bypass_store_good['countBy']['name'])
#   dis = Distributor.find_by(name:bypass_store_good['distributor']['name'])
#   loc = Location.find_by(name: bypass_store_good['location']['name'])
#   pro = Product.find_by(name: bypass_store_good['product']['name'])

#   StoreGood.create!(
#     amount_in_stock: 0,
#     count_by_id: countBy.id,
#     delivery_day: bypass_store_good['deliveryDay'],
#     max_amount: bypass_store_good['maxAmount'],
#     distributor_id: dis.id,
#     replenish_by: bypass_store_good['replenishBy'],
#     product_id: pro.id,
#     location_id: loc.id,
#     store_id: 2
#   )

# end

# ######################################################################## DOVER ROAD LOCATIONS

# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   locations(storeId: 2) {
#     id
#     name
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# dover_locations = JSON.parse(response.body)['data']['locations']

# dover_locations.each do |dover_location|
#   Location.create!(
#     name: dover_location['name'],
#     store_id: 1
#   )
# end

# ######################################################################## DOVER ROAD STOREGOODS

# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   getStoreGoods(id: 2) {
#     id
#     deliveryDay
#     maxAmount
#     replenishBy
#     countBy {
#       id
#       name
#     }
#     distributor {
#       id
#       name
#     }
#     location {
#       id
#       name
#     }
#     product {
#       id
#       name
#     }
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# dover_store_goods = JSON.parse(response.body)['data']['getStoreGoods']

# dover_store_goods.each do |dover_store_good|
#   countBy = CountBy.find_by(name: dover_store_good['countBy']['name'])
#   dis = Distributor.find_by(name:dover_store_good['distributor']['name'])
#   loc = Location.find_by(name: dover_store_good['location']['name'])
#   pro = Product.find_by(name: dover_store_good['product']['name'])

#   StoreGood.create!(
#     amount_in_stock: 0,
#     count_by_id: countBy.id,
#     delivery_day: dover_store_good['deliveryDay'],
#     max_amount: dover_store_good['maxAmount'],
#     distributor_id: dis.id,
#     replenish_by: dover_store_good['replenishBy'],
#     product_id: pro.id,
#     location_id: loc.id,
#     store_id: 1
#   )

# end

# ######################################################################## CAMBRIDGE LOCATIONS

# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   locations(storeId: 4) {
#     id
#     name
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# cambridge = JSON.parse(response.body)['data']['locations']

# cambridge.each do |cambridge_location|
#   Location.create!(
#     name: cambridge_location['name'],
#     store_id: 3
#   )
# end

# ######################################################################## CAMBRIDGE STOREGOODS

# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   getStoreGoods(id: 4) {
#     id
#     deliveryDay
#     maxAmount
#     replenishBy
#     countBy {
#       id
#       name
#     }
#     distributor {
#       id
#       name
#     }
#     location {
#       id
#       name
#     }
#     product {
#       id
#       name
#     }
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# cambridge_store_goods = JSON.parse(response.body)['data']['getStoreGoods']

# cambridge_store_goods.each do |cambridge_store_good|
#   countBy = CountBy.find_by(name: cambridge_store_good['countBy']['name'])
#   dis = Distributor.find_by(name:cambridge_store_good['distributor']['name'])
#   loc = Location.find_by(name: cambridge_store_good['location']['name'])
#   pro = Product.find_by(name: cambridge_store_good['product']['name'])

#   StoreGood.create!(
#     amount_in_stock: 0,
#     count_by_id: countBy.id,
#     delivery_day: cambridge_store_good['deliveryDay'],
#     max_amount: cambridge_store_good['maxAmount'],
#     distributor_id: dis.id,
#     replenish_by: cambridge_store_good['replenishBy'],
#     product_id: pro.id,
#     location_id: loc.id,
#     store_id: 3
#   )

# end


# ######################################################################## TRAPPE LOCATIONS


# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   locations(storeId: 1) {
#     id
#     name
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# trappe_locations = JSON.parse(response.body)['data']['locations']

# trappe_locations.each do |trappe_location|
#   Location.create!(
#     name: trappe_location['name'],
#     prepcenter_id: 1
#   )
# end

# ######################################################################## TRAPPE STOREGOODS

# require 'net/http'
# require 'uri'

# uri = URI.parse("https://polar-falls-55197.herokuapp.com/graphql")
# request = Net::HTTP::Post.new(uri)
# request.content_type = "application/json;charset=UTF-8"
# request["Connection"] = "keep-alive"
# request["Pragma"] = "no-cache"
# request["Cache-Control"] = "no-cache"
# request["Accept"] = "application/json, text/plain, */*"
# request["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
# request["Origin"] = "https://still-badlands-25708.herokuapp.com"
# request["Sec-Fetch-Site"] = "cross-site"
# request["Sec-Fetch-Mode"] = "cors"
# request["Sec-Fetch-Dest"] = "empty"
# request["Referer"] = "https://still-badlands-25708.herokuapp.com/"
# request["Accept-Language"] = "en-US,en;q=0.9"
# request.body = JSON.dump({
#   "query" => "{
#   getStoreGoods(id: 1) {
#     id
#     deliveryDay
#     maxAmount
#     replenishBy
#     countBy {
#       id
#       name
#     }
#     distributor {
#       id
#       name
#     }
#     location {
#       id
#       name
#     }
#     product {
#       id
#       name
#     }
#   }
# }
# "
# })

# req_options = {
#   use_ssl: uri.scheme == "https",
# }

# response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
#   http.request(request)
# end

# trappe_store_goods = JSON.parse(response.body)['data']['getStoreGoods']

# trappe_store_goods.each do |trappe_store_good|
#   countBy = CountBy.find_by(name: trappe_store_good['countBy']['name'])
#   dis = Distributor.find_by(name:trappe_store_good['distributor']['name'])
#   loc = Location.find_by(name: trappe_store_good['location']['name'])
#   pro = Product.find_by(name: trappe_store_good['product']['name'])

#   StoreGood.create!(
#     amount_in_stock: 0,
#     count_by_id: countBy.id,
#     max_amount: trappe_store_good['maxAmount'],
#     distributor_id: dis.id,
#     replenish_by: trappe_store_good['replenishBy'],
#     product_id: pro.id,
#     location_id: loc.id,
#     prepcenter_id: 1
#   )

# end


# def scan_order(order_id)
#   Order.find(order_id).inventories.each do |inv|
#     if (inv.quantity_needed > 0)
#       inv.update_columns(scanned:true, quantity_needed:0, invoiced_quantity: inv.quantity_needed)
#     end
#   end
# end



# Order.find(55).scanned_inventories
# Order.find(55).update(status:"pending")


# def update_orders(order_id)
#   order = Order.find(order_id)
#   scanned_inventories = order.scanned_inventories

#   scanned_inventories.each do |inventory|
#     product = inventory.store_good_including_deleted.product

#     if ([nil, 0].exclude?(product.case_quantity) && inventory.store_good_including_deleted.replenish_by != "CASE")
#       total = (product.marked_up_price / product.case_quantity) * inventory.invoiced_quantity
#       inventory.update_columns(invoiced_price: total.round(2), invoiced_product_price: product.marked_up_price)
#     else
#       total = product.marked_up_price * inventory.invoiced_quantity
#       inventory.update_columns(invoiced_price: total.round(2), invoiced_product_price: product.marked_up_price)
#     end
    
#   end 

#   sum = scanned_inventories.sum(:invoiced_price)
#   order.update(sale_total: sum.round(2), status: 'complete')
# end


# def update_inventory(order_id)
#   order = Order.find(order_id)

#   order.inventories.each do |inventory|
#     store_good = inventory.store_good_including_deleted
#     quantity = inventory.quantity_needed + inventory.invoiced_quantity

#     store_good.update(amount_in_stock: quantity)

#     if store_good.count_by.name == '%'
#       inventory.quantity <= 25 ? inventory.update(quantity_needed: 1, status: 'complete') : inventory.update(quantity_needed: 0, status: 'complete')
#     elsif store_good.product.case_quantity && store_good.product.case_quantity > 0 && store_good.count_by.name == 'EA' && store_good.replenish_by == 'CASE'
#       case_amount = store_good.max_amount - inventory.quantity
#       case_result = (case_amount.to_f / store_good.product.case_quantity.to_f).ceil
#       case_result > 0 ? inventory.update(quantity_needed: case_result, status: 'complete') : inventory.update(quantity_needed: 0, status: 'complete')
#     else
#       result = store_good.max_amount - inventory.quantity
#       result > 0 ? inventory.update(quantity_needed: result, status: 'complete') : inventory.update(quantity_needed: 0, status: 'complete')
#     end
#   end
# end


# order_ids.each{|x| update_orders(x)}

# GiftCard.all.each do |gc|
#   found_customer = Customer.find_by(
#     "LOWER(first_name)= ? AND LOWER(last_name) = ?",
#     gc.first_name.strip.downcase, gc.last_name.strip.downcase
#   )

#   if !found_customer
#     puts "creating new Customer for #{gc.id}"
#     new_cus = Customer.create!(
#       first_name: gc.first_name.strip,
#       last_name: gc.last_name.strip,
#       phone_number: gc.phone_number,
#       email: gc.email
#     )
#     gc.update!(customer_id: new_cus.id)
#   else
#     puts "customer found! updating - #{gc.id}"
#     gc.update!(customer_id: found_customer.id)
#   end
# end


# Customer.where.not("phone_number ~* ?", '^\(\d{3}\) \d{3}-\d{4}$').find_each do |user|
#   raw_phone = user.phone_number.gsub(/\D/, '') # Remove non-digit characters

#   # Skip if the phone number is empty or has invalid length
#   next if raw_phone.empty? || raw_phone.length != 10

#   # Format phone number (e.g., from 1234567890 to (123) 456-7890)
#   formatted_phone = raw_phone.gsub(/^(\d{3})(\d{3})(\d{4})$/, '(\1) \2-\3')

#   # Update the user phone number
#   user.update(phone_number: formatted_phone)
# end
