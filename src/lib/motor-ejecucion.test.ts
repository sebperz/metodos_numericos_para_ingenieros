import { describe, test, expect } from "vitest";
import { crearMotorEjecucion, type MotorEjecucion, type PyodideRuntime } from "./motor-ejecucion";

function crearFakeRuntime(salidaPre: any = null) {
  const store = new Map<string, any>();
  if (salidaPre) store.set("__salida__", salidaPre);
  let lastCode = "";

  return {
    runPython(code: string) { lastCode = code; },
    globals: { get(key: string) { return store.get(key); } },
    loadPackage: async () => {},
    _lastCode: () => lastCode,
  };
}

function motorCon(runtime: PyodideRuntime) {
  return crearMotorEjecucion(async () => runtime);
}

describe("MotorEjecucion", () => {
  test("ejecutar devuelve Salida leida de __salida__ del runtime", async () => {
    const runtime = crearFakeRuntime({
      iteraciones: [{ i: 0, a: 1, b: 2, xr: 1.5, ea: null }],
      resultado: 1.5,
    });
    const motor = motorCon(runtime);

    const result = await motor.ejecutar("x = 1", { a: 1 });

    expect(result.resultado).toBe(1.5);
    expect(result.iteraciones).toHaveLength(1);
  });

  test("inyecta parametros como variables globales antes del codigo", async () => {
    const runtime = crearFakeRuntime({
      iteraciones: [],
      resultado: 0,
    });
    const motor = motorCon(runtime);

    await motor.ejecutar("x = a + b", { a: 1, b: 2.5, expr: "x**2" });

    const code = runtime._lastCode();
    expect(code).toContain("a = 1");
    expect(code).toContain("b = 2.5");
    expect(code).toContain('expr = "x**2"');
    expect(code.endsWith("x = a + b")).toBe(true);
  });

  test("lanza error descriptivo cuando runPython falla", async () => {
    const runtime = crearFakeRuntime(null);
    runtime.runPython = () => {
      throw new Error("SyntaxError: invalid syntax");
    };
    const motor = motorCon(runtime);

    await expect(
      motor.ejecutar("codigo invalido", {}),
    ).rejects.toThrow("Error de sintaxis en el código");
  });

  test("lanza error cuando el codigo no define __salida__", async () => {
    const runtime = crearFakeRuntime(null);
    const motor = motorCon(runtime);

    await expect(
      motor.ejecutar("x = 1", {}),
    ).rejects.toThrow('El código debe definir __salida__');
  });

  test("incluye 'from math import *' en el codigo ensamblado", async () => {
    const runtime = crearFakeRuntime({
      iteraciones: [],
      resultado: 0,
    });
    const motor = motorCon(runtime);

    await motor.ejecutar("x = 1", {});

    expect(runtime._lastCode()).toContain("from math import *");
  });

  test("carga el runtime solo en la primera ejecucion", async () => {
    let loadCount = 0;
    const runtime = crearFakeRuntime({
      iteraciones: [],
      resultado: 0,
    });

    const loadRuntime = async () => {
      loadCount++;
      return runtime;
    };

    const motor = crearMotorEjecucion(loadRuntime);

    await motor.ejecutar("x = 1", {});
    await motor.ejecutar("x = 2", {});

    expect(loadCount).toBe(1);
  });
});
