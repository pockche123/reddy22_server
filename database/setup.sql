DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS bins;
DROP TABLE IF EXISTS materials; 

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE entries (
    entry_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (entry_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE bins (
    bin_id INT GENERATED ALWAYS AS IDENTITY,
    bin_type VARCHAR (100) NOT NULL,
    color VARCHAR (100),
    bin_image VARCHAR (1000) NOT NULL,
    info VARCHAR (1000) NOT NULL,
    PRIMARY KEY (bin_id)
);

CREATE TABLE materials (
    material_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (50) NOT NULL,
    material_image VARCHAR (1000) NOT NULL,
    bin_id INT NOT NULL,
    FOREIGN KEY (bin_id) REFERENCES bins(bin_id)
);

INSERT INTO bins (bin_type, color, bin_image, info) VALUES
    ('Recycling collection', 'blue', 'https://www.warwickdc.gov.uk/images/Recycing_bin_1.jpg', 'Your 240 litre recycling bin will be collected every fortnight – check the collection calendar for your collection day.'),
    ('Refuge collection', 'grey', 'https://www.warwickdc.gov.uk/images/Waste_bin_1.jpg', 'The grey bin is collected every three weeks.\nPlease use your grey bin for household items that can not be recycled. All rubbish must be contained in the grey bin with the lid firmly closed. Bags of rubbish left anywhere around the bin will not be collected. Any extra rubbish can be taken to a Household Waste Recycling Centre.'),
    ('Garden waste', 'green', 'https://www.warwickdc.gov.uk/images/Garden_waste_bin_1.jpg', 'If you would like to receive a garden waste collection service, there is a charge of £40 per bin, which will cover the period between 1 April 2023 and 31 March 2024 (with a two-week break over the Christmas and New year period).'),
    ('Food waste', 'brown', 'https://www.warwickdc.gov.uk/images/Food_caddy_full_4.gif', 'Food waste can be wrapped in newspaper or contained in a compostable caddy liner or any type of plastic bag (including old bread wrappers, cereal packets, used sandwich bags etc) before placing in your 23 litre food waste bin. All liners and bags are removed before processing and are sent to energy from waste.');
