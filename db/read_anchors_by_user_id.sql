SELECT users_id, handle, platform, entity_img, list_anchor 
FROM tracking
WHERE users_id = $1