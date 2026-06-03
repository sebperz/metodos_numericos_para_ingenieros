---
titulo: "Método de Newton-Raphson"
area: "Raíces de Ecuaciones"
descripcion_breve: "Usa la derivada de la función para converger cuadráticamente a la raíz"
tipo_grafico: "convergencia"
parametros:
  - nombre: "expr"
    tipo: "string"
    default: "x**3 - x - 2"
  - nombre: "x0"
    tipo: "float"
    default: 1.5
  - nombre: "tol"
    tipo: "float"
    default: 0.0001
  - nombre: "max_iter"
    tipo: "int"
    default: 50
---

El método de Newton-Raphson usa la tangente a la curva en el punto actual para estimar la raíz:

$$x_{i+1} = x_i - \frac{f(x_i)}{f'(x_i)}$$

La derivada $f'(x)$ se aproxima numéricamente por diferencias finitas. La convergencia es **cuadrática** cuando se parte de una estimación inicial cercana a la raíz. Es uno de los métodos más eficientes para raíces simples, pero puede divergir si el valor inicial está lejos o si $f'(x) \approx 0$.

```python
from math import *

def f(x):
    return eval(expr, {"x": x, "sin": sin, "cos": cos, "exp": exp,
                       "log": log, "pi": pi, "sqrt": sqrt, "abs": abs,
                       "e": e, "tan": tan}, {})

def df(x, h=1e-6):
    return (f(x + h) - f(x - h)) / (2 * h)

iteraciones = []
x = x0
x_prev = x0
for i in range(max_iter):
    fx = f(x)
    fpx = df(x)

    if fpx == 0:
        raise ValueError("Derivada nula — el metodo no puede continuar")

    x_new = x - fx / fpx
    ea = abs((x_new - x) / x_new) if i > 0 else None

    iteraciones.append({
        "i": i + 1,
        "x": x,
        "fx": fx,
        "x_new": x_new,
        "ea": ea if ea is not None else None,
    })

    if ea is not None and ea < tol:
        break

    x = x_new

__salida__ = {
    "iteraciones": iteraciones,
    "resultado": x,
    "datos_grafico": {
        "x": [it["i"] for it in iteraciones],
        "y": [it["ea"] if it["ea"] is not None else 1 for it in iteraciones],
    },
}
```
