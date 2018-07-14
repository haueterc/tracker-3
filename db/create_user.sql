INSERT INTO users (
    display_name,
    picture,
    platform_and_id,
    provider_platform,
    provider_id,
    access_token,
    access_token_secret
) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;