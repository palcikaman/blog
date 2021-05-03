CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  created TIMESTAMP
);

INSERT INTO post (id, title, content, created) VALUES
  (DEFAULT, 'JAJJ, Az első posztom <3', '<p>Hú de jó blogot írni</p>', '2021-04-13 18:05:06'),
  (DEFAULT, 'Szomorú fej :(', '<p>Senki nem olvasta el az első posztomat, pedig már 3 milliszekundom óta kint van</p>', '2021-04-13 18:05:09'),
  (DEFAULT, 'Jobb is', '<p>Amúgy sem akartam, hogy bárki elolvassa amit írok, senki nem elég jó ahhoz, hogy megérdemelje a gondolataimat!!!!!!4!</p>', '2021-04-13 18:10:06')
