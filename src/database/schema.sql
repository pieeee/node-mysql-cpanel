CREATE TABLE users(
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);
SELECT
  DATE_FORMAT(created_at, '%D %M %Y') AS earliest_date
FROM
  users
ORDER BY
  created_at
LIMIT
  5;
SELECT
  DATE_FORMAT(created_at, '%M') AS joined_month,
  COUNT(*)
FROM
  users
GROUP BY
  joined_month
ORDER BY
  DATE_FORMAT(created_at, '%m');

SELECT COUNT(users.email) FROM users WHERE users.email LIKE '%@yahoo.com%';

SELECT 
    CASE
        WHEN email LIKE '%@yahoo.com%' THEN 'yahoo'
        WHEN email LIKE '%@gmail.com%' THEN 'gmail'
        WHEN email LIKE '%@hotmail.com%' THEN 'hotmail'
        ELSE 'others'
    END AS hosts,
    COUNT(*) AS total_user
FROM users
GROUP BY hosts;

