drop table defaultdb.EvenementsUser; 
drop table defaultdb.Utilisateur;

create table defaultdb.Utilisateur(
	id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
	user_name varchar(255),
    user_password varchar(255)
);

create table defaultdb.EvenementsUser(
	id_event INT AUTO_INCREMENT PRIMARY KEY,
	even_type varchar(255),
    date_event datetime,
    utilisateur_id int ,
    foreign key (utilisateur_id) references Utilisateur (id_utilisateur)
);


INSERT INTO defaultdb.Utilisateur (user_name, user_password) VALUES ('admin', 'abc123'),('admin2','abc123');



INSERT INTO defaultdb.EvenementsUser  (even_type, utilisateur_id, date_event)  VALUES('Post', 1, '2023-10-12 08:30:00');

select * from defaultdb.Utilisateur;