CREATE SEQUENCE customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE customer_point (
    id_customer VARCHAR PRIMARY KEY,
    nm_customer VARCHAR,
    id_point VARCHAR,
    point_type VARCHAR,
    point_customer INTEGER,
    no_hp_customer BIGINT,
    address_customer VARCHAR
);

CREATE OR REPLACE FUNCTION generate_customer_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.id_customer := 'C' || LPAD(nextval('customer_id_seq')::TEXT, 3, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_customer_point
BEFORE INSERT ON customer_point
FOR EACH ROW
EXECUTE FUNCTION generate_customer_id();

INSERT INTO customer_point (nm_customer, id_point, point_type, point_customer, no_hp_customer, address_customer) VALUES
('Palagan Agung', 'PID001', 'Roma Arden', 10, 6281209762851, 'Suite 452 89340 Pfeffer Crossroad, South Kandramouth, LA 62692'),
('Azmi Rusli', 'PID002', 'Kuaci Fuzo', 10, 6281209762332, '581 Donya Fords, South Marvinfurt, TN 00214-2636'),
('Amira Azzahra', 'PID003', 'Gentle Gen', 20, 6281209733353, '48875 Darnell Bypass, Port Scot, WY 57947-7445'),
('Palagan Agung', 'PID002', 'Kuaci Fuzo', 20, 6281209762851, 'Suite 452 89340 Pfeffer Crossroad, South Kandramouth, LA 62692'),
('Amira Azzahra', 'PID001', 'Roma Arden', 10, 6281209762332, '581 Donya Fords, South Marvinfurt, TN 00214-2636');

CREATE TABLE point_details (
    id_point_detail VARCHAR PRIMARY KEY,
    id_customer VARCHAR REFERENCES customer_point(id_customer),
    id_point VARCHAR,
    point_amount INTEGER,
    transaction_type VARCHAR,
    transaction_date TIMESTAMP
);

INSERT INTO point_details (id_point_detail, id_customer, id_point, point_amount, transaction_type, transaction_date) VALUES
('IDP001', 'C001', 'PID001', 10, 'IN', '2024-06-25'),
('IDP002', 'C002', 'PID002', 10, 'IN', '2024-06-25'),
('IDP003', 'C003', 'PID003', 10, 'IN', '2024-06-25'),
('IDP004', 'C003', 'PID003', 10, 'IN', '2024-06-25'),
('IDP005', 'C003', 'PID003', 10, 'OUT', '2024-06-26'),
('IDP006', 'C001', 'PID002', 10, 'IN', '2024-06-25'),
('IDP007', 'C001', 'PID002', 10, 'IN', '2024-06-25'),
('IDP008', 'C001', 'PID002', 10, 'OUT', '2024-06-26'),
('IDP009', 'C001', 'PID002', 10, 'IN', '2024-06-26'),
('IDP010', 'C003', 'PID001', 10, 'IN', '2024-06-26');
