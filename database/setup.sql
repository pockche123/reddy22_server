DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS materials; 
DROP TABLE IF EXISTS bins CASCADE;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    address VARCHAR(255),
    isAdmin BOOLEAN DEFAULT FALSE,
    isCouncilMember BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE posts (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isCommunity BOOLEAN DEFAULT FALSE,
    enrolls INT DEFAULT 0,
    PRIMARY KEY (post_id),
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
    PRIMARY KEY (material_id),
    FOREIGN KEY (bin_id) REFERENCES bins(bin_id)
    PRIMARY KEY (material_id)
);

CREATE TABLE scores (
    score_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    value INT NOT NULL,
    PRIMARY KEY (score_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO bins (bin_type, color, bin_image, info) VALUES
    ('Recycling collection', 'blue', 'https://www.warwickdc.gov.uk/images/Recycing_bin_1.jpg', 'Your 240 litre recycling bin will be collected every fortnight - check the collection calendar for your collection day.'),
    ('Refuge collection', 'grey', 'https://www.warwickdc.gov.uk/images/Waste_bin_1.jpg', 'The grey bin is collected every three weeks.\nPlease use your grey bin for household items that can not be recycled. All rubbish must be contained in the grey bin with the lid firmly closed. Bags of rubbish left anywhere around the bin will not be collected. Any extra rubbish can be taken to a Household Waste Recycling Centre.'),
    ('Garden waste', 'green', 'https://www.warwickdc.gov.uk/images/Garden_waste_bin_1.jpg', 'If you would like to receive a garden waste collection service, there is a charge of £40 per bin, which will cover the period between 1 April 2023 and 31 March 2024 (with a two-week break over the Christmas and New year period).'),
    ('Food waste', 'brown', 'https://www.warwickdc.gov.uk/images/Food_caddy_full_4.gif', 'Food waste can be wrapped in newspaper or contained in a compostable caddy liner or any type of plastic bag (including old bread wrappers, cereal packets, used sandwich bags etc) before placing in your 23 litre food waste bin. All liners and bags are removed before processing and are sent to energy from waste.');

INSERT INTO materials (name, material_image, bin_id) VALUES
    ('paper', 'https://www.pixartprinting.co.uk/blog/wp-content/uploads/2021/03/Carta_Riciclata.jpg', 1),
    ('card and cardboard', 'https://miro.medium.com/v2/resize:fit:1200/1*KR7l3KcOvAp50OAilLMNUQ.jpeg', 1),
    ('glass bottles and jars', 'https://www.friendsofglass.com/wp-content/uploads/Recycling_1.jpg', 1),
    ('metal tins and cans', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FOk_sKTl2XOwV9Ib6MIUYfIoR3B7B8jovg', 1),
    ('Aerosols', 'https://i0.wp.com/www.circularonline.co.uk/wp-content/uploads/2022/09/aerosal.jpg?w=1000&ssl=1', 1),
    ('clean foil', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7DNJqnx0aydjEKMIB4BWqjMk0nvHkaPzklQ', 1),
    ('plastic bottles', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbKVX7ZxdPViTtbtZBoBBTU-FAIr7EntG0A', 1),
    ('food and drink cartons', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkLodtFDnso4aTNEvxNUwJpRdoeDzjc7MJ_A', 1),
    ('textiles', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFR3SpL3luB3OUI3ypJpbdrvbAcEUIwXwFRQ.jpg', 2),
    ('household batteries', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1mSngStXhZgxnPb4_L9n9kBZeCWgpn52kQ', 2),
    ('small electrical items', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZCjRhvXOdSnJs3gN1xlqmrPyrY-fdtj_0VQ', 2),
    ('Nappies', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVQ3d_8w5TI1HJ15wT5kiCBJQiwYrAyNr85w', 2),
    ('Black bags and general rubbish', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-8maCWn7BmehwdFqY6Nw3SZhxQT33JPL8Q', 2),
    ('Plastic film from food containers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboBIHRDsfI3EQVHdckwjkS8Q67woezbd0DQ&usqp=CAU', 2),
    ('grass cuttings', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqlUGZrFZClNrblCg7RjIWG5tQZfLBU8IRA', 3),
    ('Hedge clippings', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKymboZR9-c06CP6OUpm1csfK3aerTDo8rA', 3),
    ('leaves and bark', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmLkjUztiEnNMUKBJwWXklhxARdeUgIghmw', 3),
    ('vase plants', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlj_u33OluQW4W7FRiCoVScmnlAdsJfaK6oQ', 3),
    ('Dairy products', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgzqMNiusW-ctMRWim8cAvEwAS5CuJZd0Izg', 4),
    ('Bread and pastries', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ65EA-i-7zdL2qMUzPzgPqP0xE16ElsuPkXg', 4),
    ('Meat and bones', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9C5yXhF1fVWJs9T3Gj7xyUCJozO6XfluqGQ', 4),
    ('Tea and coffee grounds', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvm0V7XjahZzBvFR2objfN5x5ClRH4b22gUQ', 4),
    ('Fruit and vegetables', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbS5PCRWW4QBu-ClXBOsMJfnM0hnG9GIA8YQ', 4),
    ('Fish', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiGIrTIGdTJVXOYIW1Gmm_CmBHV_DIf2f5aQ', 4),
    ('Rice, pasta and beans', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBjXRaS5sLUdBuyVYlNoATkm4xSD1wSh7S0w', 4);
