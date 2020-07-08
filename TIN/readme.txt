Projekt zawiera prosta implementacje strony internetowej do przegladania i oceniania wpisow.
Projekt zawiera takie funkcjonalnosci jak logowanie/rejestracja uzytkownika, mozliwosc dodawania wpisow/usuwania, oceniania.
Admin posiada mozliwosc blokady uzytkownika/usuniecia go z bazy danych/usuniecia postow.

1. Przed uruchomieniem projektu trzeba zainstalowac podane nizej biblioteki:
npm i express
npm i mysql2
npm i body-parser
npm i express-flash
npm i express-session
npm i bcryptjs
npm i node
2. W mysql workbench wykonać kod sql podany w pliku schema.sql (bez ostatniej linijki) ktory znajduje sie w katalogu model
3. W konsoli wpisać node app.js w celu uruchomienia projektu, poźniej w przegladarce wpisac localhost:3000
4. Zarejestrowac użytkownika o nazwie Admin w późniejszym celu ustawienia mu odpowiedniej roli, żeby pokazać wszystkie funkcjonalności strony
5. Wykonać ostatnia linijke kodu sql z pliku schema.sql