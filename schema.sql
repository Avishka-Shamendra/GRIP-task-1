DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS transfers CASCADE;


CREATE TABLE customer(
    id int not null PRIMARY KEY,
    name VARCHAR(100) not null,
    email VARCHAR(100) not null UNIQUE,
    balance NUMERIC(10,2) not null DEFAULT 0,
    CHECK(balance>=0)
);

CREATE TABLE transfers(
    transfer_id SERIAL,
    from_id int not null,
    to_id int not null,
    amount NUMERIC(10,2) not null,
    transaction_timestamp timestamp not null DEFAULT NOW(),
    PRIMARY KEY(transfer_id),
    FOREIGN KEY(from_id) REFERENCES customer(id)  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(to_id) REFERENCES customer(id)  ON DELETE CASCADE ON UPDATE CASCADE
);

--assigned as the account for the user of the app
INSERT INTO customer VALUES (0,'Avishka Shamendra','avishka@gmail.com',500000.00);

--other customers
INSERT INTO customer VALUES (1,'John Doe','john@gmail.com',40000.00);
INSERT INTO customer VALUES (2,'Sam Smith','sam@gmail.com',50000.00);
INSERT INTO customer VALUES (3,'Kumar Patel','kumar@gmail.com',35000.00);
INSERT INTO customer VALUES (4,'Amal Senanayake','amal@gmail.com',67000.00);
INSERT INTO customer VALUES (5,'Randy Orton','randy@gmail.com',80000.00);
INSERT INTO customer VALUES (6,'Joe Root','joe@gmail.com',55000.00);
INSERT INTO customer VALUES (7,'David Smith','david@gmail.com',450000.00);
INSERT INTO customer VALUES (8,'Adam Daniel','adam@gmail.com',45700.00);
INSERT INTO customer VALUES (9,'Anne Green','anne@gmail.com',34000.00);
INSERT INTO customer VALUES (10,'Monica Geller','monica@gmail.com',25000.00);

GRANT ALL ON SEQUENCE public.transfers_transfer_id_seq TO bank_app;

GRANT ALL ON TABLE public.customer TO bank_app;

GRANT ALL ON TABLE public.transfers TO bank_app;

