CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE landlords (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  email VARCHAR(100)
  );
  INSERT INTO landlords (first_name, last_name, email)
  VALUES ('Jason', 'Chalangary', 'jason@email.com');

CREATE TABLE properties (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  address VARCHAR(150),
  postcode VARCHAR(10),
  landlord_id INT REFERENCES landlords(id)
  );
  INSERT INTO properties (address, postcode, landlord_id)
  VALUES ('123 Postgres Way', 'pg1 5ql', 1);
 CREATE TABLE tenants (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  email VARCHAR(100),
  linked BOOL,
  property_id INT REFERENCES properties(id),
  landlord_id INT REFERENCES landlords(id)
  );
  INSERT INTO tenants (first_name, last_name, email, linked, property_id, landlord_id)
  VALUES ('Emilia', 'Williamson', 'emilia@email.com', true, 1, 1),
			('Adie', 'Nunn', 'adie@email.com', false, 1, 1);

CREATE TABLE tickets (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
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
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id BIGINT,
  ticket_id uuid REFERENCES tickets(id),
  user_role VARCHAR(35),
  message VARCHAR(500),
  time TIME DEFAULT CURRENT_TIME,
  date DATE DEFAULT CURRENT_DATE
   );


  INSERT INTO messages (user_id, ticket_id, user_role, message, time, date)
  VALUES (1, '37c106c0-81d6-4aab-81a3-3aa23b607f4f', 'landlord','Have you had a chance to look at the agreement yet?', DEFAULT, DEFAULT),
  (3, '37c106c0-81d6-4aab-81a3-3aa23b607f4f', 'tenant','Yes, all done and signed.' , DEFAULT, DEFAULT),
(3, '37c106c0-81d6-4aab-81a3-3aa23b607f4f', 'landlord','Great, I will get the keys to you on Monday.' , DEFAULT, DEFAULT),
  (2, '5b557644-8937-4571-b6cd-915e1a31135f', 'tenant','The sink is broken, please help ASAP!' , DEFAULT, DEFAULT),
        (1, '5b557644-8937-4571-b6cd-915e1a31135f', 'landlord','Is it a problem with the tap?', DEFAULT, DEFAULT),
(2, '5b557644-8937-4571-b6cd-915e1a31135f', 'tenant','No, the pipe seems to have a leak.', DEFAULT, DEFAULT);







CREATE TABLE tenants (
  id INT GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  email VARCHAR(100),
  linked BOOL,
  property_id INT REFERENCES properties(id),
  landlord_id INT REFERENCES landlords(id)
  );
  INSERT INTO tenants (first_name, last_name, email, linked, property_id, landlord_id)
  VALUES ('Emilia', 'Williamson', 'emilia@email.com', true, 1, 1),
			('Adie', 'Nunn', 'adie@email.com', false, 1, 1);