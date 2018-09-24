INSERT INTO tracking
(users_id, handle, platform, entity_img, list_anchor)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;