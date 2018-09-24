SELECT (association_1,
        association_2,
        association_3,
        association_4,
        association_5,
        association_6,
        association_7,
        association_8,
        association_9,
        association_10)
FROM tracking
WHERE users_id = $1
AND list_anchor = $2