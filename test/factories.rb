Factory.define :user do |f|
  f.email 'test@example.com'               # Interpolate.
  f.password f.password_confirmation('foobar') # Chain.
end

Factory.define :goal do |f|
  f.name "Work Out"
end

Factory.define :goal_entry do |f|
  f.occured_on Date.today
end
