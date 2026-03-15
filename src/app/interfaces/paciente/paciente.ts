export interface Paciente {
    id: number;
    nombre: string;
    apellidos: string;
    riesgo: 'bajo' | 'medio' | 'alto';
    discapacidad: 'fisica' | 'intelectual' | 'sensorial';
    en_seguimiento: boolean;
}
