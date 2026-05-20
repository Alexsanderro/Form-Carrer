import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the DB helpers so tests don't need a real database
vi.mock("./db", () => ({
  insertRegistro: vi.fn().mockResolvedValue(undefined),
  listRegistros: vi.fn().mockResolvedValue([
    { id: 1, curso: "ADS — Análise e Desenvolvimento de Sistemas", periodo: "2º período", createdAt: new Date("2026-01-15T10:00:00Z") },
    { id: 2, curso: "Engenharia de Software", periodo: "4º período", createdAt: new Date("2026-01-16T14:30:00Z") },
  ]),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "owner-open-id",
      email: "admin@example.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("registros.salvar", () => {
  it("salva um registro com curso e período válidos (acesso público)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.registros.salvar({
      curso: "ADS — Análise e Desenvolvimento de Sistemas",
      periodo: "1º período",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejeita quando curso está vazio", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.registros.salvar({ curso: "", periodo: "1º período" })
    ).rejects.toThrow();
  });

  it("rejeita quando período está vazio", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.registros.salvar({ curso: "ADS", periodo: "" })
    ).rejects.toThrow();
  });
});

describe("registros.listar", () => {
  it("retorna lista de registros para admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.registros.listar();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("curso");
    expect(result[0]).toHaveProperty("periodo");
    expect(result[0]).toHaveProperty("createdAt");
  });

  it("rejeita acesso de usuário comum (não admin)", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.registros.listar()).rejects.toThrow();
  });

  it("rejeita acesso não autenticado", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.registros.listar()).rejects.toThrow();
  });
});

describe("registros.exportarCsv", () => {
  it("retorna CSV com cabeçalho e linhas para admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.registros.exportarCsv();
    expect(result).toHaveProperty("csv");
    expect(result.csv).toContain("ID,Curso,Período,Data/Hora");
    expect(result.csv).toContain("ADS — Análise e Desenvolvimento de Sistemas");
    expect(result.csv).toContain("Engenharia de Software");
  });

  it("rejeita acesso de usuário comum ao CSV", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.registros.exportarCsv()).rejects.toThrow();
  });

  it("rejeita acesso não autenticado ao CSV", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.registros.exportarCsv()).rejects.toThrow();
  });
});
