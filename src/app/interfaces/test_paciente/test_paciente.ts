/**
 * Modelo para una pregunta individual.
 * Define la estructura y el comportamiento de cualquier pregunta en el test.
 */
export interface PreguntaTest {
  id: string;
  // Unión de tipos literales: Solo permite estos valores específicos para el tipo de prueba.
  // Esto garantiza seguridad en el tipado y evita errores de escritura.
  tipo: 'imagen' | 'texto' | 'dibujo' | 'audio' | 'opciones';
  titulo: string;
  
  // Propiedades opcionales (?): Solo se usan si el tipo de pregunta lo requiere.
  urlMedia?: string;        // Para imágenes o audios externos
  opciones?: string[];      // Para preguntas de elección múltiple
  preguntasTexto?: string[]; // Subpreguntas si fuera necesario
  tiempoMaximo?: number;    // Límite de tiempo (útil para pruebas de fluidez verbal)
}

/**
 * Agrupador de preguntas por pantalla.
 * Permite que el Test Runner sepa qué conjunto de preguntas mostrar en cada paso.
 */
export interface PaginaTest {
  id: string;
  preguntas: PreguntaTest[];
}

/**
 * Estructura para almacenar la respuesta del usuario.
 * Relaciona una pregunta con su valor contestado.
 */
export interface RespuestaCuestionario {
  idPregunta: string;
  // Usamos 'any' porque el valor puede ser un String (texto) o un String Base64 (dibujo).
  valor: any; 
}

/**
 * Objeto final que se guarda en el historial del paciente.
 * Contiene el sello de tiempo y el array completo de respuestas.
 */
export interface ResultadoPrueba {
  fechaFinalizacion: string; // ISO String para asegurar compatibilidad con bases de datos
  respuestas: RespuestaCuestionario[];
}
