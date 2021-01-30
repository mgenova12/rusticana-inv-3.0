# based on https://github.com/rweng/pry-rails/blob/master/lib/pry-rails/prompt.rb

def formatted_env
  if Rails.env.production?
    bold_env = Pry::Helpers::Text.bold(Rails.env)
    Pry::Helpers::Text.red(bold_env)
  elsif Rails.env.development?
    Pry::Helpers::Text.green(Rails.env)
  else
    Rails.env
  end
end

draw_prompt = lambda do |target_self, nest_level, pry, sep|
  "[#{Pry::Prompt.formatted_env}] " \
  "(#{Pry.view_clip(target_self)})" \
  "#{":#{nest_level}" unless nest_level.zero?}#{sep} "
end

prompts = [
  proc do |target_self, nest_level, pry|
    draw_prompt.call(target_self, nest_level, pry, '>')
  end,
  proc do |target_self, nest_level, pry|
    draw_prompt.call(target_self, nest_level, pry, '*')
  end
]

Pry.config.prompt = prompts
