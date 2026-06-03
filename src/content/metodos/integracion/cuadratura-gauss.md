---
titulo: "Cuadratura de Gauss"
area: "Integración Numérica"
descripcion_breve: "Elige puntos y pesos optimos para maxima precision con minimas evaluaciones"
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
    default: 3
---

La cuadratura gaussiana aproxima la integral eligiendo puntos de evaluación y pesos de manera óptima:

$$\int_a^b f(x)\,dx \approx \frac{b-a}{2}\sum_{i=1}^{n} w_i\,f\!\left(\frac{b-a}{2}x_i + \frac{a+b}{2}\right)$$

donde $x_i$ y $w_i$ son los puntos y pesos de Gauss-Legendre en el intervalo $[-1, 1]$. Con $n$ puntos, integra exactamente polinomios de grado hasta $2n-1$.

```python
from math import *

def f(x):
    return eval(expr, {"x": x, "sin": sin, "cos": cos, "exp": exp,
                       "log": log, "pi": pi, "sqrt": sqrt, "abs": abs,
                       "e": e, "tan": tan}, {})

# Gauss-Legendre points and weights for n = 2, 3, 4, 5
gauss_data = {
    2: (
        [-0.5773502691896257,  0.5773502691896257],
        [ 1.0,                 1.0               ],
    ),
    3: (
        [-0.7745966692414834,  0.0,               0.7745966692414834],
        [ 0.5555555555555556,  0.8888888888888888, 0.5555555555555556],
    ),
    4: (
        [-0.8611363115940526, -0.3399810435848563, 0.3399810435848563,  0.8611363115940526],
        [ 0.3478548451374538,  0.6521451548625461, 0.6521451548625461,  0.3478548451374538],
    ),
    5: (
        [-0.9061798459386640, -0.5384693101056831, 0.0,               0.5384693101056831,  0.9061798459386640],
        [ 0.2369268850561891,  0.4786286704993665, 0.5688888888888889, 0.4786286704993665,  0.2369268850561891],
    ),
}

if n not in gauss_data:
    raise ValueError(f"n debe ser uno de: {sorted(gauss_data.keys())}")

xi, wi = gauss_data[n]
integral = 0.0
puntos_x = []
puntos_y = []
for i in range(n):
    x_mapped = ((b - a) * xi[i] + a + b) / 2
    puntos_x.append(x_mapped)
    puntos_y.append(f(x_mapped))
    integral += wi[i] * f(x_mapped)

integral *= (b - a) / 2

__salida__ = {
    "iteraciones": [
        {"i": 1, "n": n, "integral": integral, "ea": None}
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
