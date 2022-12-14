CREATE DATABASE LIBRARY
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

--DROP TABLE usuarios;
--DROP TABLE alunos;
--DROP TABLE livros CASCADE;
--DROP TABLE autor CASCADE;
--DROP TABLE autoria CASCADE;
--DROP TABLE emprestimos;

CREATE TABLE usuarios (
    idUsuario serial PRIMARY KEY,
    nomeUsuario VARCHAR not null,
    senhaUsuario INTEGER not null	
);

CREATE TABLE alunos (
    idAluno serial PRIMARY KEY,
    matriculaAluno INTEGER not null,
    nomeAluno VARCHAR not null,
    telefoneAluno VARCHAR not null
);

CREATE TABLE livros (
    idLivro serial PRIMARY KEY,
    isbnLivro VARCHAR not null,
    tituloLivro VARCHAR not null,
    idAutor INTEGER not null,
    editoraLivro VARCHAR not null,
    anoLivro DATE not null,
    qtdeLivroDisponivel INTEGER not null
);

CREATE TABLE autor (
    idAutor serial PRIMARY KEY,
    nomeAutor VARCHAR not null,
    nacionalidadeAutor VARCHAR not null
);

CREATE TABLE autoria (
    idLivro INTEGER not null,
    idAutor INTEGER not null,
    PRIMARY KEY (idAutor, idLivro)
);

CREATE TABLE emprestimos (
    IdEmprestimo serial PRIMARY KEY,
    idLivro INTEGER not null,
    idAluno INTEGER not null,
    dataEmprestimo DATE not null,
    dataDevolucao DATE,
    idUsuario INTEGER not null
);
 
--ALTER TABLE livros ADD CONSTRAINT FK_livros_2
--    FOREIGN KEY (idAutor, idLivro)
--    REFERENCES autoria (idAutor, idLivro);
 
-- ALTER TABLE autoria ADD CONSTRAINT FK_autoria_1
--    FOREIGN KEY (idLivro)
--    REFERENCES livros (idLivro)
--    ON DELETE RESTRICT;
 
--ALTER TABLE autoria ADD CONSTRAINT FK_autoria_2
--    FOREIGN KEY (idAutor)
--    REFERENCES autor (idAutor)
--    ON DELETE RESTRICT;
 
ALTER TABLE emprestimos ADD CONSTRAINT FK_emprestimos_2
    FOREIGN KEY (idLivro)
    REFERENCES livros (idLivro)
    ON DELETE SET NULL;
 
ALTER TABLE emprestimos ADD CONSTRAINT FK_emprestimos_3
    FOREIGN KEY (idAluno)
    REFERENCES alunos (idAluno)
    ON DELETE SET NULL;
 
ALTER TABLE emprestimos ADD CONSTRAINT FK_emprestimos_4
    FOREIGN KEY (idUsuario)
    REFERENCES usuarios (idUsuario);