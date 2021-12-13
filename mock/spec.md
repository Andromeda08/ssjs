# Specifikáció
Az oldalon megtekinthető és szerkeszthető egy tulajdonosokat és háziállatokat nyilvántartó adatbázis.  
A háziállatok tulajdonosaikhoz vannak rendelve, egy tulajdonosnak több háziállata is lehet.  
Négy nézettel rendelkezik az oldal:
- Bejelentkezési oldal (Jelszót kér, ha ok redirect tulajdonosok listájára)
- Tulajdonosok listája (Új, Szerkesztés és Törlés)
- Adott tulajdonos háziállatainak listája (Új, Szerkesztés és Törlés)
- Egy szerkesztő form, tulajdonosok és háziállatok hozzáadásához és szerkesztéséhez
Egy tulajdonos háziállatait egy gomb megnyomásával tekinthetjük meg, ami a az adott tulajdonos háziállatait listázó nézethez vezet. Innen visszaléphetünk a tulajdonosok listájához. A "Edit" gombbal módosíthatjuk, az "New" gombbal pedig létrehozhatunk háziállatokat és tulajdonosokat a szerkesztő nézettel (innen a "Cancel" gombbal kiléphetünk módosítások végzése nélkül).
A "Logout" gombbal kijelentkezhetünk, ez a bejelentkezési oldalra redirectel miután kijelentkeztünk.
# Entitások
## Tulajdonos (Owner)
A tulajdonos entitás tulajdonságai:
- Név
- Születési Dátum
- Lakcím
- Telefonszám
## Háziállat (Pet)
A háziállatok tulajdonosokhoz vannak hozzásrendelve.
A háziállat entitás tulajdonságai:
- Név
- Születési Dátum
- Faj
- Nem
- Tulajdonos
# Middlewares
- middleware/auth/
    - validate
    - auth
- middleware/owner/
    - getOwners
    - getOwner
    - createOwner
    - updateOwner
    - deleteOwner
- middleware/pet/
    - getPets
    - getPet
    - createPet
    - updatePet
    - deletePet
# Routing
## Index
- GET, POST/
    - validate : Jelszó ellenőrzése POST-nál, ha ok redirect tulajdonosok listájára.
- GET /logout
## Tulajdonos
- GET /owner
    - auth : Auth
    - getOwnersMW
- GET, POST /owner/new
    - auth : Auth
    - createOwnerMW
- GET, POST /owner/edit/:ownerID
    - auth : Auth
    - getOwnerMW
    - updateOwnerMW
- GET, POST /owner/delete/:ownerID
    - auth : Auth
    - getOwnerMW
    - deleteOwnerMW
## Háziállat
- GET /pet/:abID
    - auth : Auth
    - getPetsMW
- GET, POST /pet/new
    - auth : Auth
    - createPetMW
- GET, POST /pet/edit/:petID
    - auth : Auth
    - getPetMW
    - updatePetMW
- GET, POST /pet/delete/:petID
    - auth : Auth
    - getPetMW
    - deletePetMW
*Kovács Balázs - BGM94Z*