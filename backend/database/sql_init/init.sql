-- PostgreSQL Table Definition

DROP TABLE IF EXISTS prefectures;
CREATE TABLE prefectures(
    pref_code INT,
    pref_name VARCHAR(30),
    PRIMARY KEY(pref_code)
);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities(
    city_id CHAR(6),
    pref_code INT,
    city_code INT,
    sityo_name VARCHAR(60),
    gst_name VARCHAR(60),
    css_name VARCHAR(60),
    json_filename VARCHAR(30),
    PRIMARY KEY(city_id),
    FOREIGN KEY(pref_code) REFERENCES prefectures(pref_code)
);