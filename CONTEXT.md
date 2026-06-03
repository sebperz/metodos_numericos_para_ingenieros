# Métodos Numéricos Interactivos

Web app interactiva que presenta métodos numéricos del libro "Métodos Numéricos para Ingenieros" de Chapra & Canale. SPA construida con Astro, ejecuta Python en el navegador vía Pyodide y renderiza gráficos con Chart.js.

## Language

**Método**:
Una técnica numérica del libro de Chapra & Canale, presentada como unidad interactiva con explicación en español, código Python en inglés, parámetros de entrada y visualización de resultados.
_Avoid_: Algoritmo, técnica (demasiado genéricos).

**Ejercicio**:
Una instancia concreta de aplicación de un Método, con datos de entrada específicos y resultado esperado. Equivale a un ejemplo resuelto del libro.
_Avoid_: Problema, ejemplo, caso.

**Parámetro**:
Un valor de entrada modificable por el usuario que alimenta la ejecución de un Método (ej. función, valor inicial, tolerancia, intervalo).
_Avoid_: Input, campo, variable.

**Salida**:
El resultado producido al ejecutar un Método con ciertos Parámetros. Puede ser numérico (tabla de iteraciones, valor final) y/o gráfico (curva de convergencia, área bajo la curva).
_Avoid_: Output, resultado (usar en contexto de Salida numérica o Salida gráfica).

**Área**:
Un capítulo temático del libro que agrupa Métodos afines. Ejemplo: "Raíces de Ecuaciones", "Integración Numérica".
_Avoid_: Capítulo, sección, categoría.

**Salida**:
El resultado producido al ejecutar un Método con ciertos Parámetros. Puede ser numérico (tabla de iteraciones, valor final) y/o gráfico (curva de convergencia, área bajo la curva).
_Avoid_: Output, resultado (usar en contexto de Salida numérica o Salida gráfica).

## Relationships

- Una **Área** agrupa uno o más **Métodos**.
- Un **Método** puede tener cero o más **Ejercicios** asociados.
- Un **Método** define sus **Parámetros**; el usuario les asigna valores.
- Una ejecución de un **Método** con **Parámetros** concretos produce una **Salida**.

## Example dialogue

> **Dev:** "¿Mostramos un Método con su código o con un Ejercicio pre-cargado?"
> **Domain expert:** "El Método muestra su lógica y el usuario ingresa Parámetros. Un Ejercicio es un caso con datos fijos del libro para comparar el resultado."
>
> **Dev:** "¿La Salida incluye siempre gráfico?"
> **Domain expert:** "No. Depende del Método. Raíces se beneficia de un gráfico de convergencia. Integración, de un gráfico del área. Pero la Salida numérica va siempre."
>
> **Dev:** "¿Cómo agrego Métodos nuevos en el futuro?"
> **Domain expert:** "Creás un .md en src/content/metodos/<area>/ y la sidebar y el routing lo recogen automáticamente. Si es una nueva Área, agregás la carpeta y aparece como sección nueva en la sidebar."

## Flagged ambiguities

None yet.
