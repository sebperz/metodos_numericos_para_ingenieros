import { useState, useCallback, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ErrorBoundary from "./ErrorBoundary";
import Grafico from "./Grafico";

interface ParamDef {
  nombre: string;
  tipo: "string" | "float" | "int";
  default: string | number;
}

interface MetodoPanelProps {
  codigo: string;
  parametros: ParamDef[];
  tipoGrafico: string | null;
}

function convertirParams(raw: Record<string, string>, parametros: ParamDef[]): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  for (const p of parametros) {
    const val = raw[p.nombre] ?? String(p.default);
    if (p.tipo === "float") {
      const n = parseFloat(val);
      result[p.nombre] = isNaN(n) ? (p.default as number) : n;
    } else if (p.tipo === "int") {
      const n = parseInt(val, 10);
      result[p.nombre] = isNaN(n) ? (p.default as number) : n;
    } else {
      result[p.nombre] = val;
    }
  }
  return result;
}

export default function MetodoPanel({ codigo, parametros, tipoGrafico }: MetodoPanelProps) {
  const [params, setParams] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const p of parametros) {
      init[p.nombre] = String(p.default);
    }
    return init;
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [salida, setSalida] = useState<any>(null);
  const motorRef = useRef<any>(null);

  const actualizarParam = (nombre: string, raw: string) => {
    setParams((prev) => ({ ...prev, [nombre]: raw }));
    setStatus("idle");
    setErrorMsg("");
  };

  const ejecutar = useCallback(async () => {
    const typedParams = convertirParams(params, parametros);
    setStatus("loading");
    setErrorMsg("");
    setSalida(null);
    try {
      const { crearMotorEjecucion } = await import("@/lib/motor-ejecucion");
      if (!motorRef.current) {
        motorRef.current = crearMotorEjecucion(async () => {
          const { loadPyodide } = await import("pyodide");
          const pyodide = await loadPyodide();
          return {
            runPython: (code: string) => pyodide.runPython(code),
            globals: {
              get: (key: string) => {
                const proxy = pyodide.globals.get(key);
                if (!proxy) return undefined;
                const js = proxy.toJs({ dict_converter: Object.fromEntries });
                return JSON.parse(JSON.stringify(js));
              },
            },
            loadPackage: async () => {},
          };
        });
      }
      const motor = motorRef.current;
      const result = await motor.ejecutar(codigo, typedParams);
      setSalida(result);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al ejecutar el método");
      setStatus("error");
    }
  }, [codigo, params, parametros]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Parámetros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {parametros.map((p) => (
            <div key={p.nombre} className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">
                {p.nombre}
              </label>
              <Input
                type={p.tipo === "string" ? "text" : "number"}
                value={params[p.nombre] ?? ""}
                step={p.tipo === "float" ? "any" : undefined}
                onChange={(e) => actualizarParam(p.nombre, e.target.value)}
              />
            </div>
          ))}
          <Button
            className="w-full mt-2"
            onClick={ejecutar}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Ejecutando..." : "Ejecutar"}
          </Button>
          {status === "error" && (
            <p className="text-sm text-destructive mt-2">{errorMsg}</p>
          )}
        </CardContent>
      </Card>

      {salida && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Resultado:{" "}
                <span className="font-mono text-foreground font-semibold">
                  {salida?.resultado != null
                    ? Number(salida.resultado).toFixed(8)
                    : "—"}
                </span>
              </p>
            </CardContent>
          </Card>

          {Array.isArray(salida.iteraciones) && salida.iteraciones.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Iteraciones</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {Object.keys(salida.iteraciones[0]).map((k: string) => (
                          <th
                            key={k}
                            className="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
                          >
                            {k}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {salida.iteraciones.map((it: any, idx: number) => (
                        <tr
                          key={idx}
                          className="border-b border-border last:border-0"
                        >
                          {Object.values(it).map((v: any, vi: number) => (
                            <td key={vi} className="px-4 py-1.5 font-mono text-xs">
                              {v === null || v === undefined
                                ? "—"
                                : typeof v === "number"
                                  ? Number(v).toFixed(6)
                                  : String(v)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          <ErrorBoundary>
            <Grafico tipo={tipoGrafico} salida={salida} />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
