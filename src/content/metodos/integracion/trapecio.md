---
titulo: "Regla del Trapecio"
area: "Integración Numérica"
descripcion_breve: "Aproxima la integral usando trapecios bajo la curva"
tipo_grafico: "area"
parametros:
  - nombre: "expr"
    tipo: "string"
    default: "x**2"
  - nombre: "a"
    tipo: "float"
    default: 0
  - nombre: "b"
    tipo: "float"
    default: 2
  - nombre: "n"
    tipo: "int"
    default: 10
---

La regla del trapecio aproxima la integral definida $\int_a^b f(x)\,dx$ dividiendo el intervalo en $n$ segmentos y sumando el área de $n$ trapecios:

$$\int_a^b f(x)\,dx \approx \frac{h}{2}\left[f(x_0) + 2\sum_{i=1}^{n-1}f(x_i) + f(x_n)\right]$$

donde $h = \frac{b - a}{n}$ es el ancho de cada segmento. Es un método de **segundo orden**: el error es $O(h^2)$.

```python
from math import *

def f(x):
    return eval(expr, {"x": x, "sin": sin, "cos": cos, "exp": exp,
                       "log": log, "pi": pi, "sqrt": sqrt, "abs": abs,
                       "e": e, "tan": tan}, {})

h = (b - a) / n
suma = f(a) + f(b)

puntos_x = [a]
puntos_y = [f(a)]

for i in range(1, n):
    x = a + i * h
    suma += 2 * f(x)
    puntos_x.append(x)
    puntos_y.append(f(x))

puntos_x.append(b)
puntos_y.append(f(b))

integral = (h / 2) * suma

__salida__ = {
    "iteraciones": [
        {"i": 1, "n": n, "h": h, "integral": integral, "ea": None}
    ],
    "resultado": integral,
    "datos_grafico": {
        "x": puntos_x,
        "y": puntos_y,
        "a": a,
        "b": b,
    },
}
```
