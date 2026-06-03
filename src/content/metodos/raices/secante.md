---
titulo: "Método de la Secante"
area: "Raíces de Ecuaciones"
descripcion_breve: "Variante de Newton-Raphson que no requiere derivada explícita"
tipo_grafico: "convergencia"
parametros:
  - nombre: "expr"
    tipo: "string"
    default: "x**3 - x - 2"
  - nombre: "x0"
    tipo: "float"
    default: 1
  - nombre: "x1"
    tipo: "float"
    default: 2
  - nombre: "tol"
    tipo: "float"
    default: 0.0001
  - nombre: "max_iter"
    tipo: "int"
    default: 50
---

El método de la secante reemplaza la derivada de Newton-Raphson por una aproximación por diferencias finitas usando los dos puntos anteriores:

$$x_{i+1} = x_i - f(x_i)\frac{x_{i-1} - x_i}{f(x_{i-1}) - f(x_i)}$$

No requiere evaluar $f'(x)$, lo que lo hace útil cuando la derivada es cara o difícil de obtener. Converge **superlinealmente** con orden $\approx 1.618$.

Al necesitar dos valores iniciales, comparte similitud con la falsa posición, pero no garantiza que la raíz esté encerrada.

```python
from math import *

def f(x):
    return eval(expr, {"x": x, "sin": sin, "cos": cos, "exp": exp,
                       "log": log, "pi": pi, "sqrt": sqrt, "abs": abs,
                       "e": e, "tan": tan}, {})

iteraciones = []
x_prev = x0
x_curr = x1
for i in range(max_iter):
    f_prev = f(x_prev)
    f_curr = f(x_curr)

    if f_curr - f_prev == 0:
        raise ValueError("Division por cero en la aproximacion de la derivada")

    x_new = x_curr - f_curr * (x_prev - x_curr) / (f_prev - f_curr)
    ea = abs((x_new - x_curr) / x_new) if i > 0 else None

    iteraciones.append({
        "i": i + 1,
        "x_prev": x_prev,
        "x_curr": x_curr,
        "x_new": x_new,
        "ea": ea if ea is not None else None,
    })

    if ea is not None and ea < tol:
        break

    x_prev = x_curr
    x_curr = x_new

__salida__ = {
    "iteraciones": iteraciones,
    "resultado": x_curr,
    "datos_grafico": {
        "x": [it["i"] for it in iteraciones],
        "y": [it["ea"] if it["ea"] is not None else 1 for it in iteraciones],
    },
}
```
