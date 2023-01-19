CREATE TABLE landlords (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  email VARCHAR(100)
  );
  INSERT INTO landlords (first_name, last_name, email)
  VALUES ('Jason', 'Chalangary', 'jason@email.com');
  
              
CREATE TABLE properties (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  address VARCHAR(150),
  postcode VARCHAR(10),
  landlord_id INT REFERENCES landlords(id)
  
  );
  INSERT INTO properties (address, postcode, landlord_id)
  VALUES ('123 postgres way', 'pg1 5ql', 1);
  
  
  
  
 CREATE TABLE tenants (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  email VARCHAR(100),
  linked BOOL,
  property_id INT REFERENCES properties(id),
  landlord_id INT REFERENCES landlords(id)
  );
  INSERT INTO tenants (first_name, last_name, email, linked, property_id, landlord_id)
  VALUES ('Julio', 'Velezmoro', 'julio@email.com', false, 1, 1),
			('Adie', 'Nunn', 'adie@email.com', false, 1, 1);


CREATE TABLE tickets (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  property_id INT REFERENCES properties(id),
  tenant_id INT REFERENCES tenants(id),
  landlord_id INT REFERENCES landlords(id),
  completed BOOL,
  raised_by VARCHAR(35)
  );
  INSERT INTO tickets (property_id , tenant_id, landlord_id, completed, raised_by)
  VALUES (1, 1, 1, false, 'landlord'),
			(1, 2, 1, true, 'tenant');


CREATE TABLE messages (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT,
  ticket_id INT REFERENCES tickets(id),
  user_role  VARCHAR(35),
  message VARCHAR(35),
  time TIME DEFAULT CURRENT_TIME,
  date DATE DEFAULT CURRENT_DATE
   );
  INSERT INTO messages (user_id, ticket_id, user_role, message, time, date)
  VALUES (1, 1, 'landlord','FFS what now!', DEFAULT, DEFAULT),
			(1, 1, 'tenant','huston we have a problem' , DEFAULT, DEFAULT);
