-- 1a.
SELECT first_name, last_name
FROM actor;

-- 1b.
SELECT Concat(UPPER(first_name), " ", UPPER(last_name)) AS "Actor Name"
FROM actor;

-- 2a.
SELECT actor_id, first_name, last_name.
FROM actor
WHERE first_name = "Joe";

-- 2b.
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name like'%GEN%';

-- 2c.
SELECT actor_id, last_name, first_name
FROM actor
WHERE last_name LIKE'%LI%'
ORDER BY last_name, first_name;

-- 2d.
SELECT country_id, country
FROM country
WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

-- 3a.
ALTER TABLE actor
ADD middle_name VARCHAR(45)
AFTER first_name;

-- 3b.
ALTER TABLE actor
MODIFY COLUMN middle_name blob;

-- 3c.
ALTER TABLE actor
DROP COLUMN middle_name;

-- 4a.
SELECT last_name, COUNT(*) AS last_name_count
FROM actor
GROUP BY last_name;

-- 4b.
SELECT last_name, COUNT(*) AS last_name_count
FROM actor
GROUP BY last_name
HAVING COUNT(*) >= 2;

-- 4c.
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name = 'WILLIAMS';

UPDATE actor
SET first_name = 'HARPO'
WHERE actor_id = 172;

-- 4d. - I messed this one up, not sure if I'm on the right track
UPDATE actor
CASE
	WHEN actor_id = 172 and first_name = 'GROUCHO' THEN SET first_name = 'GROUCHO'
    WHEN actor_id = 172 and first_name = 'HARPO' THEN SET first_name = 'GROUCHO'
    WHEN actor_id = 172 THEN SET first_name = 'MUCHO GROUCHO'
END;

-- 5a.
SHOW CREATE TABLE sakila.address;

-- 6a.
SELECT first_name, last_name, address
FROM staff INNER JOIN address
WHERE staff.address_id = address.address_id;

-- 6b.
SELECT concat(first_name, " ", last_name) AS full_name, SUM(amount)
FROM staff INNER JOIN payment
WHERE
	staff.staff_id = payment.staff_id AND
    payment_date BETWEEN '2005-08-01' AND '2005-08-31'
GROUP BY full_name;

-- 6c.
SELECT title, COUNT(actor_id)
FROM film INNER JOIN film_actor
WHERE film.film_id = film_actor.film_id
GROUP BY title;

-- 6d.
SELECT title, COUNT(inventory.film_id) 
FROM film INNER JOIN inventory
WHERE film.film_ID = inventory.film_id AND
       title = 'HUNCHBACK IMPOSSIBLE';

-- 6e.
SELECT first_name, last_name, SUM(amount)
FROM customer INNER JOIN payment
WHERE customer.customer_id = payment.customer_id
GROUP BY customer.customer_id
ORDER BY last_name;

-- 7a.
SELECT title
FROM film
WHERE title LIKE 'K%' OR title LIKE 'Q%'
	AND language_id IN
		(SELECT language_id
         FROM language
         WHERE name = 'English');
         
-- 7b.
SELECT first_name, last_name
FROM actor
WHERE actor_id IN
	(SELECT actor_id
     FROM film_actor
     WHERE film_id IN
		(SELECT film_id
         From film
         WHERE title = 'Alone Trip'));
         
-- 7c. 
SELECT first_name, last_name, email, country.country
FROM customer, address, city, country
WHERE customer.address_id =  address.address_id
	AND address.city_id = city.city_id
    AND city.country_id = country.country_id
    AND country.country = 'Canada';
    
-- 7d. 
SELECT title, category.name
FROM film, film_category, category
WHERE film.film_id = film_category.film_id
	AND film_category.category_id = category.category_id
    AND category.name = 'Family';
    
-- 7e. 
SELECT film.title, COUNT(rental_id)
FROM rental, inventory, film
WHERE rental.inventory_id = inventory.inventory_id
	AND inventory.film_id = film.film_id
GROUP BY film.film_id
ORDER BY COUNT(rental_id) DESC;

-- 7f. 
# SELECT store_id
# FROM store, payment
# WHERE store_id IN
#	(SELECT store_id
#     FROM staff
#     WHERE staff_id IN
#		(SELECT staff_id
#		 FROM rental
#			WHERE rental_id IN
#            (SELECT rental_id
#             FROM payment
#             )));

-- 7g.
SELECT store.store_id, city.city, country.country
FROM store
	INNER JOIN address
		
    INNER JOIN city
WHERE store.address_id = address.address_id
	AND address.city_id = city.city_id
    AND city.country_id = country.country_id;

-- 7h.

-- 8a. 
   