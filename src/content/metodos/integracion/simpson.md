---
titulo: "Reglas de Simpson"
area: "Integración Numérica"
descripcion_breve: "Aproxima la integral con polinomios de segundo y tercer grado (Simpson 1/3 y 3/8)"
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

Las reglas de Simpson mejoran la aproximación de la integral usando polinomios de mayor grado:

**Simpson 1/3** ajusta una parábola a cada tres puntos consecutivos:

$$\int_a^b f(x)\,dx \approx \frac{h}{3}\left[f(x_0) + 4\sum_{i\,\text{impar}}f(x_i) + 2\sum_{i\,\text{par}}f(x_i) + f(x_n)\right]$$

Requiere $n$ par. Error $O(h^4)$.

**Simpson 3/8** usa polinomios cúbicos con cuatro puntos. Si $n$ es impar, se aplica Simpson 3/8 a los primeros tres segmentos y Simpson 1/3 al resto.

```python
from math import *

def f(x):
    return eval(expr, {"x": x, "sin": sin, "cos": cos, "exp": exp,
                       "log": log, "pi": pi, "sqrt": sqrt, "abs": abs,
                       "e": e, "tan": tan}, {})

h = (b - a) / n
puntos_x = [a]
puntos_y = [f(a)]

if n % 2 == 0:
    # Simpson 1/3
    suma = f(a) + f(b)
    for i in range(1, n):
        x = a + i * h
        puntos_x.append(x)
        puntos_y.append(f(x))
        if i % 2 == 0:
            suma += 2 * f(x)
        else:
            suma += 4 * f(x)
    puntos_x.append(b)
    puntos_y.append(f(b))
    integral = (h / 3) * suma
else:
    # Simpson 3/8 en los primeros 3 segmentos + 1/3 en el resto
    h38 = 3 * h
    a1 = a + 3 * h
    r38 = (3 * h / 8) * (f(a) + 3 * f(a + h) + 3 * f(a + 2 * h) + f(a1))

    for x_pt in [a, a + h, a + 2 * h, a1]:
        puntos_x.append(x_pt)
        puntos_y.append(f(x_pt))

    n13 = n - 3
    h13 = (b - a1) / n13
    suma13 = f(a1) + f(b)
    for i in range(1, n13):
        x = a1 + i * h13
        puntos_x.append(x)
        puntos_y.append(f(x))
        if i % 2 == 0:
            suma13 += 2 * f(x)
        else:
            suma13 += 4 * f(x)
    puntos_x.append(b)
    puntos_y.append(f(b))
    integral = r38 + (h13 / 3) * suma13

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
