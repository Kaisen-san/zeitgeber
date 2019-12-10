-- Criar tabelas

DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product (
	product_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(100),
	category VARCHAR(100)
);

DROP TABLE IF EXISTS image CASCADE;
CREATE TABLE image (
	image_id SERIAL PRIMARY KEY NOT NULL,
	image_url VARCHAR(200)
);

DROP TABLE IF EXISTS option CASCADE;
CREATE TABLE option (
	option_id SERIAL PRIMARY KEY NOT NULL,
	option VARCHAR(100),
	subtext VARCHAR(100)
);

DROP TABLE IF EXISTS product_card;
CREATE TABLE product_card (
	product_id SERIAL PRIMARY KEY NOT NULL
		REFERENCES product (product_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	brief VARCHAR(200),
	image_id SERIAL
		REFERENCES image (image_id)
);

DROP TABLE IF EXISTS product_images;
CREATE TABLE product_images (
	image_id SERIAL NOT NULL
		REFERENCES image (image_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	product_id SERIAL NOT NULL
		REFERENCES product (product_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	PRIMARY KEY (image_id, product_id)
);

DROP TABLE IF EXISTS product_info;
CREATE TABLE product_info (
	product_id SERIAL PRIMARY KEY NOT NULL
		REFERENCES product (product_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	long_description VARCHAR(2000),
	short_description VARCHAR(500),
	bullets VARCHAR(1000),
	characteristics VARCHAR(1000)
);

DROP TABLE IF EXISTS product_options;
CREATE TABLE product_options (
	option_id SERIAL NOT NULL
		REFERENCES option (option_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	product_id SERIAL NOT NULL
		REFERENCES product (product_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	PRIMARY KEY (option_id, product_id)
);

DROP TABLE IF EXISTS feature;
CREATE TABLE feature (
	feature_id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(100),
	content VARCHAR(2000),
	button VARCHAR(100),
	image_id SERIAL
		REFERENCES image (image_id)
);

DROP TABLE IF EXISTS hero;
CREATE TABLE hero (
	hero_id SERIAL PRIMARY KEY NOT NULL,
	message VARCHAR(100),
	image_id SERIAL
		REFERENCES image (image_id)
);

DROP TABLE IF EXISTS project_info;
CREATE TABLE project_info (
	info_id SERIAL PRIMARY KEY NOT NULL,
	image_id SERIAL
		REFERENCES image (image_id),
	content VARCHAR(1000)
);



-- Inserir dados

insert into product (name, category) values ('Bioimped�ncia', 'BIO 55');
insert into product (name, category) values ('Act�grafo', 'HORUS');
insert into product (name, category) values ('EEG', 'EEG 57');
insert into product (name, category) values ('Plataforma de For�a', 'PLT 20');
insert into product (name, category) values ('Ox�grafo', 'OXI 70');
insert into product (name, category) values ('NIRS', 'NIRS 77');
insert into product (name, category) values ('Act�grafo Mini', 'HORUSm');
insert into product (name, category) values ('EEG Mini', 'EEG 47');
insert into product (name, category) values ('Act�grafo Wear', 'HORUSw');

insert into image (image_url) values ('/img/hero.jpg');
insert into image (image_url) values ('/img/ft-cloud.png');
insert into image (image_url) values ('/img/pd-bioimp.jpg');
insert into image (image_url) values ('/img/pd-eeg.jpg');
insert into image (image_url) values ('/img/pd-horus.jpg');
insert into image (image_url) values ('/img/pd-nirs.jpg');
insert into image (image_url) values ('/img/pd-oxigrafo.jpg');
insert into image (image_url) values ('/img/pd-plataforma.jpg');
insert into image (image_url) values ('/img/ss-01.jpg');
insert into image (image_url) values ('/img/ss-02.jpg');
insert into image (image_url) values ('/img/ss-03.jpg');
insert into image (image_url) values ('/img/ss-04.jpg');
insert into image (image_url) values ('/img/ss-05.jpg');
insert into image (image_url) values ('/img/ss-06.jpg');
insert into image (image_url) values ('/img/ss-07.jpg');
insert into image (image_url) values ('/img/ss-08.jpg');
insert into image (image_url) values ('/img/ss-09.jpg');
insert into image (image_url) values ('/img/ss-10.jpg');
insert into image (image_url) values ('/img/ss-11.jpg');
insert into image (image_url) values ('/img/ss-12.jpg');
insert into image (image_url) values ('/img/ss-13.jpg');
insert into image (image_url) values ('/img/ss-14.jpg');
insert into image (image_url) values ('/img/ss-15.jpg');
insert into image (image_url) values ('/img/ss-16.jpg');
insert into image (image_url) values ('/img/ss-17.jpg');
insert into image (image_url) values ('/img/ss-18.jpg');
insert into image (image_url) values ('/img/ss-19.jpg');
insert into image (image_url) values ('/img/ss-20.jpg');
insert into image (image_url) values ('/img/sss-03.jpg');
insert into image (image_url) values ('/img/sss-04.jpg');
insert into image (image_url) values ('/img/sss-05.jpg');
insert into image (image_url) values ('/img/sss-06.jpg');
insert into image (image_url) values ('/img/sss-07.jpg');
insert into image (image_url) values ('/img/sss-08.jpg');

insert into option (option, subtext) values ('Placa montada + case', 'Recebe um conjunto montado e funcional.');
insert into option (option, subtext) values ('Esquema el�trico + Layout', 'Recebe os arquivos para edi��o.');
insert into option (option, subtext) values ('Firmware + c�digo fonte', 'Recebe os arquivos para edi��o.');
insert into option (option, subtext) values ('SW residente', 'Recebe o SW para instala��o.');
insert into option (option, subtext) values ('Sistema cloud de cl�nicas', 'Recebe o sistema cloud de cl�nicas para uso.');
insert into option (option, subtext) values ('Esquema el�trico', 'Recebe os arquivos para edi��o.');
insert into option (option, subtext) values ('Layout', 'Recebe os arquivos para edi��o.');
insert into option (option, subtext) values ('Firmware base', 'Recebe os arquivos para edi��o.');

insert into product_card values (1, 'Equipamento port�til que mede 50mm x 50mm', 3);
insert into product_card values (2, 'Equipamento port�til que mede 50mm de di�metro', 5);
insert into product_card values (3, 'Equipamento port�til que mede 50mm x 70mm', 4);
insert into product_card values (4, 'Estrutura mec�nica em alum�nio com formato triangular', 8);
insert into product_card values (5, 'Equipamento port�til que mede 70mm de di�metro', 7);
insert into product_card values (6, 'Equipamento port�til que mede 70mm x 70mm', 6);
insert into product_card values (7, 'Equipamento port�til que mede 25mm x 36mm', 5);
insert into product_card values (8, 'Equipamento port�til que mede 41mm x 70mm', 4);
insert into product_card values (9, 'Equipamento port�til que mede 35mm x 40mm', 5);

insert into product_info values (1, '', '', '');
insert into product_info values (2, '', '', '');
insert into product_info values (3, '', '', '');
insert into product_info values (4, '', '', '');
insert into product_info values (5, '', '', '');
insert into product_info values (6, '', '', '');
insert into product_info values (7, '', '', '');
insert into product_info values (8, '', '', '');
insert into product_info values (9, '', '', '');

update product_info set long_description = 'A bioimped�ncia ou bioimpedanciometria � um m�todo de avalia��o da composi��o corporal, atrav�s deste teste � poss�vel estimar a quantidade de tecido muscular, tecido adiposo e �sseo de uma determinada parte do corpo. Possibilita tamb�m estimar a quantidade de �gua presente no corpo. O equipamento funciona por meio da passagem de uma corrente el�trica impercept�vel pelo corpo, esta corrente circula livremente entre o l�quido do tecido muscular, mas depara-se com a resist�ncia do tecido adiposo (gordura).
O resultado de imped�ncia obtido possibilita o c�lculo do volume que h� de �gua no organismo, sendo assim computados com boa precis�o a quantidade de massa magra (m�sculos) e tecido adiposo (gordura) contida no corpo.
Utiliza o conceito de �Wearable Device� (dispositivo vest�vel) para ser utilizado pelo usu�rio de forma cont�nua sem interferir em suas atividades di�rias, tornando-se parte de sua vestimenta. A leitura � feita por meio de 2 eletrodos adesivos fixados a pele.
Este equipamento foi projetado para ser carregado pelo usu�rio em um bolso, ou preso em alguma parte da vestimenta atrav�s de um clip, por exemplo.';

update product_info set bullets = 'Equipamento port�til que mede 50mm x 50mm
Bioimpedanciometria de tecidos
Cart�o de mem�ria externo micro SD Card
Bateria recarreg�vel via porta Micro USB
Comunica��o bluetooth v4.2 ou USB para transfer�ncia dos dados armazenados no cart�o';

update product_info set characteristics = 'ESPECIFICA��O;BIOIMPED�NCIA
Classe;Classe II
Prote��o de Entrada;IPX0
Invasividade;N�o invasivo
Modo de Opera��o;Cont�nua
Classifica��o por Parte Aplicada;Tipo CF
Tipo de Alimenta��o;Bateria 3,7V 900mAh
Consumo;19mW
Autonomia de Bateria;7 dias
RF Radiada (Bluetooth);2,4GHz + 4dBm RF Power v4.2
Faixa de Temperatura Ambiente;-40�C a 85�C';

update product_info set short_description = 'Equipamento port�til com suporte a cart�o micro SD. Bateria recarreg�vel. Permite transfer�ncia de dados por Bluetooth v4.2 e cabo USB.';

insert into product_options values (1, 1);
insert into product_options values (2, 1);
insert into product_options values (3, 1);
insert into product_options values (4, 1);
insert into product_options values (5, 1);

insert into product_options values (1, 2);
insert into product_options values (2, 2);
insert into product_options values (3, 2);
insert into product_options values (4, 2);
insert into product_options values (5, 2);

insert into product_options values (1, 3);
insert into product_options values (2, 3);
insert into product_options values (3, 3);
insert into product_options values (4, 3);
insert into product_options values (5, 3);

insert into product_options values (1, 4);
insert into product_options values (2, 4);
insert into product_options values (3, 4);
insert into product_options values (4, 4);
insert into product_options values (5, 4);

insert into product_options values (1, 5);
insert into product_options values (2, 5);
insert into product_options values (3, 5);
insert into product_options values (4, 5);
insert into product_options values (5, 5);

insert into product_options values (1, 6);
insert into product_options values (2, 6);
insert into product_options values (3, 6);
insert into product_options values (4, 6);
insert into product_options values (5, 6);

insert into product_options values (1, 7);
insert into product_options values (2, 7);
insert into product_options values (3, 7);
insert into product_options values (4, 7);
insert into product_options values (5, 7);

insert into product_options values (6, 8);
insert into product_options values (7, 8);
insert into product_options values (8, 8);
insert into product_options values (4, 8);
insert into product_options values (5, 8);

insert into product_options values (6, 9);
insert into product_options values (7, 9);
insert into product_options values (8, 9);
insert into product_options values (4, 9);
insert into product_options values (5, 9);

insert into feature (title, content, button, image_id) values ('Dados dispon�veis na nuvem', 'Os dispositivos podem ser integrados com outros sistemas como computadores, smartphones e tablets, permitindo que os dados coletados sejam armazenados e processados posteriormente e at� mesmo em tempo real. A conex�o por bluetooth possibilita a transfer�ncia de dados a sistemas inteligentes dotados de algoritmos que processam e interagem com o usu�rio.
Todos os equipamentos utilizam m�todos de medi��o de sinais fisiol�gicos n�o-invasivos, ou seja, n�o envolvem instrumentos que rompem a pele ou que penetram fisicamente no corpo, portanto, n�o oferecem risco e desconforto no seu uso.', 'Saiba Mais', 2);

insert into hero (message, image_id) values ('Zeitgeber: Your open source biosensing tools store', 1);

insert into project_info (image_id, content) values (29, '');
insert into project_info (image_id, content) values (30, '');
insert into project_info (image_id, content) values (31, '');
insert into project_info (image_id, content) values (32, '');
insert into project_info (image_id, content) values (33, '');
insert into project_info (image_id, content) values (34, '');

insert into product_images values (9, 1);
insert into product_images values (10, 1);
insert into product_images values (11, 1);
insert into product_images values (12, 1);
insert into product_images values (13, 1);
insert into product_images values (14, 1);
insert into product_images values (15, 1);

insert into product_images values (9, 2);
insert into product_images values (10, 2);
insert into product_images values (11, 2);
insert into product_images values (12, 2);
insert into product_images values (13, 2);
insert into product_images values (14, 2);
insert into product_images values (15, 2);

insert into product_images values (9, 3);
insert into product_images values (10, 3);
insert into product_images values (11, 3);
insert into product_images values (12, 3);
insert into product_images values (13, 3);
insert into product_images values (14, 3);
insert into product_images values (15, 3);

insert into product_images values (9, 4);
insert into product_images values (10, 4);
insert into product_images values (11, 4);
insert into product_images values (12, 4);
insert into product_images values (13, 4);
insert into product_images values (14, 4);
insert into product_images values (15, 4);

insert into product_images values (9, 5);
insert into product_images values (10, 5);
insert into product_images values (11, 5);
insert into product_images values (12, 5);
insert into product_images values (13, 5);
insert into product_images values (14, 5);
insert into product_images values (15, 5);

insert into product_images values (9, 6);
insert into product_images values (10, 6);
insert into product_images values (11, 6);
insert into product_images values (12, 6);
insert into product_images values (13, 6);
insert into product_images values (14, 6);
insert into product_images values (15, 6);

insert into product_images values (9, 7);
insert into product_images values (10, 7);
insert into product_images values (11, 7);
insert into product_images values (12, 7);
insert into product_images values (13, 7);
insert into product_images values (14, 7);
insert into product_images values (15, 7);

insert into product_images values (9, 8);
insert into product_images values (10, 8);
insert into product_images values (11, 8);
insert into product_images values (12, 8);
insert into product_images values (13, 8);
insert into product_images values (14, 8);
insert into product_images values (15, 8);

insert into product_images values (9, 9);
insert into product_images values (10, 9);
insert into product_images values (11, 9);
insert into product_images values (12, 9);
insert into product_images values (13, 9);
insert into product_images values (14, 9);
insert into product_images values (15, 9);
