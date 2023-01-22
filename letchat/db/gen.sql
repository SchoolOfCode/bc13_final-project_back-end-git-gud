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
  date DATE DEFAULT CURRENT_DATE,
  time TIME DEFAULT CURRENT_TIME,
  completed BOOL,
  raised_by VARCHAR(35),
  subject VARCHAR(100),
  message VARCHAR(1000)
  );
  INSERT INTO tickets (property_id , tenant_id, landlord_id, date, time, completed, raised_by, subject, message)
  VALUES (1, 1, 1, DEFAULT, DEFAULT, false, 'landlord', 'Tenancy agreement', 'I have uploaded the tenancy agreement. Please sign and upload when you have read through.'),
      (1, 2, 1, DEFAULT, DEFAULT, true, 'tenant', 'Broken sink', 'The sink is spraying water like a fountain! Please send someone to fix it ASAP. I hate water waste.');
CREATE TABLE messages (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT,
  ticket_id INT REFERENCES tickets(id),
  user_role VARCHAR(35),
  message VARCHAR(500),
  time TIME DEFAULT CURRENT_TIME,
  date DATE DEFAULT CURRENT_DATE
   );
  INSERT INTO messages (user_id, ticket_id, user_role, message, time, date)
  VALUES (1, 1, 'landlord','Have you had a chance to look at the agreement yet?', DEFAULT, DEFAULT),
  (3, 1, 'tenant','Yes, all done and signed.' , DEFAULT, DEFAULT),
  (2, 1, 'tenant','This is real bad scoob. The sink!!' , DEFAULT, DEFAULT),
        (1, 1, 'landlord','Oh god...', DEFAULT, DEFAULT);