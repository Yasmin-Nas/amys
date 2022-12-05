create table tbl_cliente (
id int not null auto_increment primary key,
nome varchar (80) not null,
telefone varchar(15),
celular varchar(15) not null, 
email varchar(256) not null,
unique index(id)
);

create table tbl_feedback (
id int not null auto_increment primary key,
criticas text, 
sugestoes text,
id_cliente int not null, 
constraint FK_cliente_feedback
foreign key (id_cliente) 
references tbl_cliente(id), 
unique index (id)
);

create table tbl_colaborador (
id int not null auto_increment primary key,
senha varchar(20) not null,
login varchar(256) not null,
unique index(id)
);

create table tbl_ingrediente(
id int not null auto_increment primary key,
nome varchar(20) not null,
acompanhamentos text not null, 
unique index(id)
);



create table tbl_pizza_ingredientes (
id int not null auto_increment primary key,

#id pizza
id_pizza int not null, # Atributo para receber a FK
constraint FK_pizza_pizza_ingredientes # É apenas um nome para a FK
foreign key (id_pizza) # Identifica quem será a FK nesta tabela
references tbl_pizza(id), # De onde virá a PK

#id ingredientes
id_ingrediente int not null, # Atributo para receber a FK
constraint FK_ingrediente_pizza_ingredientes# É apenas um nome para a FK
foreign key (id_ingrediente) # Identifica quem será a FK nesta tabela
references tbl_ingrediente(id), # De onde virá a PK
unique index (id)
);



create table tbl_promocao (
id int not null auto_increment primary key,
nome varchar(30) not null,
prazo date not null, 
descricao text not null, 
preco varchar(6) not null,
unique index(id)
);

create table tbl_pizza_promocao (
id int not null auto_increment primary key,

#id pizza
id_pizza int not null, # Atributo para receber a FK
constraint FK_pizza_pizza_promocao # É apenas um nome para a FK
foreign key (id_pizza) # Identifica quem será a FK nesta tabela
references tbl_pizza(id), # De onde virá a PK

#id promocao
id_promocao int not null, # Atributo para receber a FK
constraint FK_promocao_pizza_promocao# É apenas um nome para a FK
foreign key (id_promocao) # Identifica quem será a FK nesta tabela
references tbl_promocao(id), # De onde virá a PK
unique index (id)
);



create table tbl_servico (
id int not null auto_increment primary key,
tipo_servico varchar (20) not null,
unique index(id)
);

create table tbl_funcionamento (
id int not null auto_increment primary key,
horario_abertura time not null,
horario_fechamento time not null, 
id_servico int not null, # Atributo para receber a FK
constraint FK_funcionamento_servico # É apenas um nome para a FK
foreign key (id_servico) # Identifica quem será a FK nesta tabela
references tbl_servico(id), # De onde virá a PK
unique index (id)
);

create table tbl_produto (
id int not null auto_increment primary key,
nome varchar(30) not null, 
preco varchar(7) not null,




unique index(id)
);



create table tbl_pizza (
id int not null auto_increment primary key,
status_favorita int not null, 

# id tipo pizza
id_tipo_pizza int not null, # Atributo para receber a FK
constraint FK_pizza_tipo_pizza # É apenas um nome para a FK
foreign key (id_tipo_pizza) # Identifica quem será a FK nesta tabela
references tbl_tipo_pizza(id), # De onde virá a PK

#id produto
id_produto int not null, # Atributo para receber a FK
constraint FK_pizza_produto # É apenas um nome para a FK
foreign key (id_produto) # Identifica quem será a FK nesta tabela
references tbl_produto(id), # De onde virá a PK
unique index(id)
);

create table tbl_tipo_pizza (
id int not null auto_increment primary key,
tipo varchar(10) not null, 
unique index(id)
);



create table tbl_bebida (
id int not null auto_increment primary key,
tamanho varchar(7) not null,
foto varchar(256) not null,

#id tipo bebida 
id_tipo_bebida int not null, # Atributo para receber a FK
constraint FK_bebida_tipo_bebida # É apenas um nome para a FK
foreign key (id_tipo_bebida) # Identifica quem será a FK nesta tabela
references tbl_tipo_bebida(id), # De onde virá a PK

#id produto
id_produto int not null, # Atributo para receber a FK
constraint FK_bebida_produto # É apenas um nome para a FK
foreign key (id_produto) # Identifica quem será a FK nesta tabela
references tbl_produto(id), # De onde virá a PK

unique index(id)
);



create table tbl_tipo_bebida (
id int not null auto_increment primary key,
tipo varchar(18) not null, 
unique index(id)
);