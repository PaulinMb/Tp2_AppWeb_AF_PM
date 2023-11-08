#select * from defaultdb.CalendrierEvents


drop table defaultdb.CalendrierEvents; 
drop table defaultdb.Utilisateur;

create table defaultdb.Utilisateur(
	id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
	user_name varchar(255),
    user_password varchar(255)
);

create table defaultdb.CalendrierEvents(
	id_events INT auto_increment primary key,
    titre_event varchar(255),
    date_event date,
    fk_id_user int,
    constraint fk_user_id foreign key (fk_id_user) references defaultdb.Utilisateur(id_utilisateur)
);

select * from defaultdb.CalendrierEvents;
select * from defaultdb.Utilisateur