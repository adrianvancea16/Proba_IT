# Pagina Web: ChefIT Vancea Adrian 321CD

Acest proiect este o pagină web simplă care include un **Header**, o **secțiune Hero** cu imagine pe fundal, și un **formular de login**. Este creat folosind HTML și CSS și poate fi folosit ca punct de pornire pentru un website mai complex.

## Funcționalități
1. **Header Responsiv**:
   - Include un logo, link-uri de navigare, și butoane de autentificare/înregistrare.
   - Design modern cu stilizare prin CSS și efect de hover.

2. **Secțiunea Hero**:
   - Fundalul secțiunii Hero este o imagine care ocupă întreg ecranul.
   - Textul central din secțiunea Hero este alb, cu un fundal semi-transparent pentru a îmbunătăți lizibilitatea.
   - Secțiunea este complet responsivă.

3. **Formular de Login**:
   - Formular de autentificare simplu cu câmpuri pentru email și parolă.
   - Stilizare elegantă, cu text alb pe fundal închis.
   - Include un link pentru recuperarea parolei.

---

## Structura Fişierelor
###  **HTML**
Codul HTML definește structura paginii:
- **Header**: Conține logo-ul, link-uri de navigare, și butoane.
- **Secțiunea Hero**: Conține o imagine pe fundal și un mesaj centralizat.
- **Formularul de Login**: Include câmpurile de email și parolă.

Pe langa acestea am implementat si functionalitati precum lista de retete resetarea parolei folosind un cont de google ce trimite emailuri si am folosit pe post de baza de date MongoDB
In MongoDb in Login-tut am implementat colectiile users si Recipies unde am pus datele despre users si retetele. Mai mult am implementat si functionalitatea de
adaugare poze a retetelor, poze care se vor stoca atat in baza de date cat si in folserul upload.
Pe partea de back end aproape orice functionalitate a fost implementata, insa pe partea de front-end mai era de lucrat, in src din fiiserul Proba_IT cel  din 
afara fisierului de back end am implementat front end ul paginii de login, dar m am focusat mai mult pe back end, cu putin timp in plus sigur reuseam de implementat si front-endul
