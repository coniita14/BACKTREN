CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    nombre VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    rol VARCHAR(20) NOT NULL
        CHECK (rol IN ('ALUMNO', 'PROFESOR')),

    deleted_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE materias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    nombre VARCHAR(100) NOT NULL,

    profesor_id UUID NOT NULL,

    deleted_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES usuarios(id)
);

CREATE TABLE alumno_materia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    alumno_id UUID NOT NULL,

    materia_id UUID NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_alumno
        FOREIGN KEY (alumno_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_materia
        FOREIGN KEY (materia_id)
        REFERENCES materias(id),

    UNIQUE(alumno_id, materia_id)
);

