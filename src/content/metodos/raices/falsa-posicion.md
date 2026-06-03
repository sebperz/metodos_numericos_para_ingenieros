---
titulo: "Método de la Falsa Posición"
area: "Raíces de Ecuaciones"
descripcion_breve: "Similar a bisección pero usa una recta secante para estimar la raíz"
tipo_grafico: "convergencia"
parametros:
  - nombre: "expr"
    tipo: "string"
    default: "x**3 - x - 2"
  - nombre: "a"
    tipo: "float"
    default: 1
  - nombre: "b"
    tipo: "float"
    default: 2
  - nombre: "tol"
    tipo: "float"
    default: 0.0001
  - nombre: "max_iter"
    tipo: "int"
    default: 50
---

El método de la falsa posición (o *regula falsi*) reemplaza el punto medio de bisección por la intersección de la recta secante que une $(a, f(a))$ con $(b, f(b))$ con el eje $x$:

$$x_r = b - f(b)\frac{a - b}{f(a) - f(b)}$$

La convergencia es más rápida que bisección, pero puede ser unilateral: uno de los extremos puede quedar fijo mientras el otro converge lentamente.

```python
from math import *

def f(x):
    return eval(expr, {"x": x, "sin": sin, "cos": cos, "exp": exp,
                       "log": log, "pi": pi, "sqrt": sqrt, "abs": abs,
                       "e": e, "tan": tan}, {})

fa = f(a)
fb = f(b)

if fa * fb > 0:
    raise ValueError("f(a) y f(b) deben tener signos opuestos")

iteraciones = []
xr_prev = a
for i in range(max_iter):
    xr = b - fb * (a - b) / (fa - fb)
    fxr = f(xr)
    ea = abs((xr - xr_prev) / xr) if i > 0 else None

    iteraciones.append({
        "i": i + 1,
        "a": a,
        "b": b,
        "xr": xr,
        "fxr": fxr,
        "ea": ea if ea is not None else None,
    })

    if fxr == 0 or (ea is not None and ea < tol):
        break

    if fa * fxr < 0:
        b = xr
        fb = fxr
    else:
        a = xr
        fa = fxr

    xr_prev = xr

__salida__ = {
    "iteraciones": iteraciones,
    "resultado": xr,
    "datos_grafico": {
        "x": [it["i"] for it in iteraciones],
        "y": [it["ea"] if it["ea"] is not None else 1 for it in iteraciones],
    },
}
```
