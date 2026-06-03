export interface PyodideRuntime {
  runPython(code: string): void;
  globals: { get(key: string): any };
  loadPackage(name: string): Promise<void>;
}

export interface Salida {
  iteraciones: Array<Record<string, number | null>>;
  resultado: number;
  datos_grafico?: { x: number[]; y: number[] };
}

export interface MotorEjecucion {
  ejecutar(codigo: string, params: Record<string, any>): Promise<Salida>;
}

export function crearMotorEjecucion(
  loadRuntime: () => Promise<PyodideRuntime>,
): MotorEjecucion {
  let runtimePromise: Promise<PyodideRuntime> | null = null;

  async function getRuntime(): Promise<PyodideRuntime> {
    if (!runtimePromise) {
      runtimePromise = loadRuntime();
    }
    return runtimePromise;
  }

  return {
    async ejecutar(codigo, params) {
      const runtime = await getRuntime();

      const lines: string[] = [];
      lines.push("from math import *");

      for (const [key, value] of Object.entries(params)) {
        if (typeof value === "string") {
          lines.push(`${key} = ${JSON.stringify(value)}`);
        } else {
          lines.push(`${key} = ${value}`);
        }
      }

      lines.push(codigo);
      const fullCode = lines.join("\n");

      try {
        runtime.runPython(fullCode);
      } catch {
        throw new Error("Error de sintaxis en el código");
      }

      const salida = runtime.globals.get("__salida__");
      if (!salida) {
        throw new Error("El código debe definir __salida__");
      }
      return {
        iteraciones: salida.iteraciones,
        resultado: salida.resultado,
        datos_grafico: salida.datos_grafico,
      };
    },
  };
}
