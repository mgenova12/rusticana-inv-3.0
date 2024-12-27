# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_12_27_141533) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "containers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "count_bies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customers", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "phone_number"
    t.string "email"
  end

  create_table "distributors", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "row_order"
  end

  create_table "gift_card_changes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "change_value"
    t.string "change_event"
    t.integer "store_id"
    t.integer "gift_card_id"
    t.string "payment_method"
    t.string "ticket_number"
  end

  create_table "gift_card_invoices", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "amount_paid"
    t.integer "store_id"
  end

  create_table "gift_cards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true
    t.decimal "amount", default: "1.0"
    t.string "card_number", default: "1"
    t.string "notes"
    t.integer "store_id"
    t.decimal "money_owed"
    t.integer "customer_id"
  end

  create_table "inventories", force: :cascade do |t|
    t.integer "store_good_id"
    t.integer "store_id"
    t.integer "location_id"
    t.integer "order_id"
    t.string "status"
    t.integer "quantity"
    t.integer "quantity_needed"
    t.integer "invoiced_quantity", default: 0
    t.boolean "scanned"
    t.string "reason_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "prepcenter_id"
    t.decimal "invoiced_price"
    t.decimal "invoiced_product_price"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.integer "store_id"
    t.integer "row_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "prepcenter_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "store_id"
    t.string "delivery_day"
    t.string "status"
    t.integer "store_order_id"
    t.integer "sale_total"
    t.string "message"
    t.boolean "paid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "prepcenter_id"
    t.boolean "is_quick_order", default: false
  end

  create_table "prepcenters", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.boolean "prepped"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "mark_up"
    t.decimal "price"
    t.integer "case_quantity"
    t.integer "distributor_id"
    t.integer "category_id"
    t.text "description"
    t.string "distributor_number"
    t.string "brand"
    t.string "unit_size"
    t.integer "portion_size"
    t.decimal "marked_up_price"
    t.integer "p_id"
    t.integer "aisle_number"
    t.integer "days_till_expire"
    t.bigint "barcode"
    t.integer "container_id"
    t.datetime "deleted_at", precision: nil
    t.index ["deleted_at"], name: "index_products_on_deleted_at"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "store_goods", force: :cascade do |t|
    t.integer "store_id"
    t.integer "product_id"
    t.integer "location_id"
    t.integer "count_by_id"
    t.integer "max_amount"
    t.string "replenish_by"
    t.string "delivery_day"
    t.integer "amount_in_stock"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "distributor_id"
    t.boolean "is_prepcenter", default: false
    t.integer "prepcenter_id"
    t.datetime "deleted_at", precision: nil
    t.boolean "active", default: true
    t.index ["deleted_at"], name: "index_store_goods_on_deleted_at"
  end

  create_table "store_orders", force: :cascade do |t|
    t.datetime "delivery_date", precision: nil
    t.string "status"
    t.integer "orders_complete"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stores", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "prepcenter_id"
    t.boolean "active", default: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "role_id"
  end

end
