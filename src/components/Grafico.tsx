import { Line, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface GraficoProps {
  tipo: string | null;
  salida: any;
}

export default function Grafico({ tipo, salida }: GraficoProps) {
  if (!tipo || !salida?.datos_grafico) return null;

  if (tipo === "convergencia") {
    const { x, y } = salida.datos_grafico;
    const data = {
      labels: x,
      datasets: [
        {
          label: "Error aproximado",
          data: y,
          borderColor: "oklch(0.546 0.18 264)",
          backgroundColor: "oklch(0.546 0.18 264 / 0.1)",
          fill: false,
          tension: 0.2,
          pointRadius: 3,
        },
      ],
    };
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Gráfico de Convergencia</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={data}
            options={{
              responsive: true,
              scales: {
                x: { title: { display: true, text: "Iteración" } },
                y: { type: "logarithmic", title: { display: true, text: "Error" } },
              },
              plugins: { legend: { display: false } },
            }}
          />
        </CardContent>
      </Card>
    );
  }

  if (tipo === "area") {
    const { x, y, a, b } = salida.datos_grafico;
    const data = {
      datasets: [
        {
          label: "f(x)",
          data: x.map((xi: number, i: number) => ({ x: xi, y: y[i] })),
          borderColor: "oklch(0.546 0.18 264)",
          backgroundColor: "oklch(0.546 0.18 264 / 0.15)",
          fill: true,
          showLine: true,
          tension: 0.3,
          pointRadius: 3,
        },
      ],
    };
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Gráfico del Área</CardTitle>
        </CardHeader>
        <CardContent>
          <Scatter
            data={data}
            options={{
              responsive: true,
              scales: {
                x: { title: { display: true, text: "x" } },
                y: { title: { display: true, text: "f(x)" } },
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx: any) => {
                      const p = ctx.raw as { x: number; y: number };
                      return `(${p.x.toFixed(4)}, ${p.y.toFixed(4)})`;
                    },
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return null;
}
