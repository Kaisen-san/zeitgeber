# Instituto Mauá de Tecnologia - Engenharia de Computação

## Projeto Zeitgeber
Projeto desenvolvido em conjunto com as aulas de Linguagens II, ministradas pelo professor Tiago Sanches ([Tiagoeem](https://github.com/Tiagoeem)), que tem como finalidade incentivar a prática dos assuntos expostos em sala, bem como prover ao aluno a oportunidade de prestar consultoria a um cliente no mundo real.

### Integrantes
Nome | RA | GitHub
------------ | ------------- | -------------
Felipe Andrade | 15.00175-0 | [Kaisen-san](https://github.com/Kaisen-san)
Matheus Mandotti | 16.00177-0 | [matheusmf1](https://github.com/matheusmf1)
Vinícius Pereira | 16.03343-4 | [VinPer](https://github.com/VinPer)

### For Devs only

#### Environment Variables and Private/Public Keys

- Use *`.env.example`* as a guide to what needs to be configured in your *`.env`*.
- After generating both JWT private and public keys, using RSA or another algorithm of you choice, you must encode them in *base64* before setting up `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` entries in *`.env`*.
- In *`src/frontend/utils/request.js`*, replace `'REPLACE_WITH_YOUR_reCAPTCHA_site_key'` with your reCAPTCHA site key. [Click here](https://developers.google.com/recaptcha/docs/v3) for more information.

#### Heroku - PostgreSQL database
When running the solution locally, you may need to get the latest heroku `DATABASE_URL` variable value, since it gets outdated every now and then. In order to do that, open command line and run the following command:
```cmd
heroku config:get DATABASE_URL -a zeitgeber
```
Then get the output value and update `DATABASE_URL` entry inside *`.env`*. Also, make sure you have `PGSSLMODE=require` set in *`.env`* to avoid running into 'SSL off' problem.