---
titulo: "Método de Bisección"
area: "Raíces de Ecuaciones"
descripcion_breve: "Encierra la raíz en un intervalo y lo reduce a la mitad en cada iteración"
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

El método de bisección encuentra la raíz de una función $f(x)$ en un intervalo $[a, b]$. Requiere que $f(a)$ y $f(b)$ tengan signos opuestos, lo que garantiza al menos una raíz en el intervalo.

En cada iteración se calcula el punto medio $x_r = \frac{a + b}{2}$ y se evalúa $f(x_r)$. El subintervalo que contiene la raíz se retiene reemplazando $a$ o $b$ por $x_r$ según el signo de $f(x_r)$.

La convergencia es lineal pero garantizada. Es ideal como método introductorio por su simplicidad.

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
    xr = (a + b) / 2
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
        "x": [it["a"] for it in iteraciones] + [iteraciones[-1]["b"]],
        "y": [0] * len(iteraciones),
    },
}
```
