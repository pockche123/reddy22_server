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


INSERT INTO (material_id, name, material_image, bin_id)
CREATE TABLE materials (
    material_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (50) NOT NULL,
    material_image VARCHAR (1000),
    bin_id INT NOT NULL,
    FOREIGN KEY (bin_id) REFERENCES bins(bin_id)
);

INSERT INTO materials (name, color, material_image, bin_id) VALUES
    ('paper', 'blue', 1),
    ('card and cardboard', 'blue', 1),
    ('glass bottles and jars', 'blue', 1),
    ('metal tins and cans', 'blue', 1),
    ('Aerosols', 'blue', 1),
    ('clean foil', 'blue', 1),
    ('plastic bottles, pots, tubs, and trays', 'blue', 1),
    ('food and drink cartons (TetraPak)', 'blue', 1),
    ('textiles', 'grey', 2),
    ('household batteries', 'grey', 2),
    ('small electrical items','grey', 2),
    ('Nappies', 'grey', 2),
    ('Black bags and general rubbish', 'grey', 2),
    ('Plastic film from food containers', 'grey', 2),
    ('grass cuttings', 'green', 3),
    ('Hedge clippings', 'green', 3),
    ('leaves and bark', 'green', 3),
    ('vase plants', 'green', 3),
    ('Dairy products', 'brown', 4),
    ('Bread and pastries', 'brown', 4),
    ('Meat and bones', 'brown', 4),
    ('Tea and coffee grounds', 'brown', 4),
    ('Fruit and vegetables', 'brown', 4),
    ('Fish', 'brown', 4),
    ('Rice, pasta and beans', 'brown', 4);

