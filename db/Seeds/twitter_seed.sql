CREATE TABLE IF NOT EXISTS twitter (
    id SERIAL PRIMARY KEY,
    users_id TEXT,
    handle TEXT,
    platform TEXT,
    entity_img TEXT,
    following_status BOOLEAN,
    id_str TEXT,
    stated_name TEXT,
    stated_url TEXT,
    verified BOOLEAN,
    stated_location TEXT,
    listed_count TEXT,
    friends_count TEXT,
    friends_count_timestamp TEXT,
    followers_count TEXT,
    followers_count_timestamp TEXT
)