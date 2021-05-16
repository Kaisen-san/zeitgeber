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
When running the solution locally, you may need to get the latest heroku `DATABASE_URL` variable value, since it gets outdated every now and then. In order to do that, open command line and run the following command:
```cmd
heroku config:get DATABASE_URL -a zeitgeber
```
Then get the output value and update `DATABASE_URL` variable inside *`.env`*.