# Métodos Numéricos Interactivos

[![Deploy to GitHub Pages](https://github.com/sebperz/metodos_numericos_para_ingenieros/actions/workflows/deploy.yml/badge.svg)](https://github.com/sebperz/metodos_numericos_para_ingenieros/actions/workflows/deploy.yml)

Web app interactiva que presenta métodos numéricos del libro *Métodos Numéricos para Ingenieros* de Chapra & Canale.

Cada método se muestra con su explicación, parámetros configurables, ejecución de código Python en el navegador (via Pyodide), tabla de iteraciones y gráficos interactivos.

[**Ver demo →**](https://sebperz.github.io/metodos_numericos_para_ingenieros/)

## Stack

- **Framework:** [Astro](https://astro.build) (SSG)
- **UI:** React + Tailwind CSS v4
- **Python runtime:** [Pyodide](https://pyodide.org) (ejecución en el navegador)
- **Gráficos:** [Chart.js](https://www.chartjs.org) via react-chartjs-2
- **Sintaxis de código:** Shiki (`github-dark-high-contrast`)
- **Fórmulas:** KaTeX (LaTeX renderizado en cliente)
- **Tests:** Vitest

## Métodos disponibles

### Raíces de Ecuaciones
- Método de Bisección
- Método de la Falsa Posición
- Método de Newton-Raphson
- Método de la Secante

### Integración Numérica
- Regla del Trapecio
- Reglas de Simpson
- Cuadratura de Gauss

## Desarrollo

```bash
pnpm install
pnpm dev        # servidor de desarrollo en http://localhost:4321
pnpm build      # compilar para producción
pnpm preview    # previsualizar la build
pnpm test       # ejecutar tests
```

## Agregar un nuevo método

Crear un archivo `.md` en `src/content/metodos/<area>/` con el siguiente formato:

```yaml
---
titulo: "Método de Ejemplo"
area: "Raíces de Ecuaciones"
descripcion_breve: "Descripción corta del método"
tipo_grafico: "convergencia"   # o "area"
parametros:
  - nombre: "expr"
    tipo: "string"
    default: "x**2 - 4"
  - nombre: "tol"
    tipo: "float"
    default: 0.0001
---

Explicación del método con fórmulas LaTeX.

```python
# Código Python que produce __salida__ con:
#   - resultado (número)
#   - iteraciones (lista de dicts)
#   - datos_grafico (x, y opcional: a, b para tipo "area")
```
```

La sidebar y el routing se actualizan automáticamente.

## Deployment

Deploy automático a GitHub Pages via **GitHub Actions** (`.github/workflows/deploy.yml`). Al pushear a `main`, se compila y publica en [`sebperz.github.io/metodos_numericos_para_ingenieros`](https://sebperz.github.io/metodos_numericos_para_ingenieros/).

Para habilitarlo en el repositorio, ir a **Settings → Pages** y seleccionar la fuente **GitHub Actions**.
