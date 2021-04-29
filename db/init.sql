CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title varchar(50),
  content text
);

INSERT INTO post (id, title, content) VALUES
  (DEFAULT, 'JAJJ, Az első posztom <3', 'Hú de jó blogot írni'),
  (DEFAULT, 'Szomorú fej :(', 'Senki nem olvasta el az első posztomat, pedig már 3 milliszekundom óta kint van'),
  (DEFAULT, 'Jobb is', 'Amúgy sem akartam, hogy bárki elolvassa amit írok, senki nem elég jó ahhoz, hogy megérdemelje a gondolataimat!!!!!!4!')
