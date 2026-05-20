import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading } = useAuth();
  const [exportLoading, setExportLoading] = useState(false);

  const { data: registros, isLoading, error, refetch } = trpc.registros.listar.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
    retry: false,
  });

  const { refetch: fetchCsv } = trpc.registros.exportarCsv.useQuery(undefined, {
    enabled: false,
    retry: false,
  });

  const handleExportCsv = async () => {
    setExportLoading(true);
    try {
      const result = await fetchCsv();
      if (!result.data?.csv) {
        toast.error("Nenhum dado para exportar.");
        return;
      }
      const blob = new Blob([result.data.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `registros_formcarrer_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Planilha exportada com sucesso!");
    } catch {
      toast.error("Erro ao exportar dados.");
    } finally {
      setExportLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0f", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ color: "#a09cb8", fontFamily: "'DM Sans', sans-serif" }}>Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0f", display: "flex",
        alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem",
        padding: "2rem", textAlign: "center",
      }}>
        <div style={{ fontSize: "3rem" }}>🔐</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#f0eef8" }}>
          Acesso Restrito
        </h2>
        <p style={{ color: "#a09cb8", maxWidth: "400px", lineHeight: 1.6 }}>
          Este painel é exclusivo para o administrador da plataforma. Faça login para continuar.
        </p>
        <a
          href={getLoginUrl()}
          style={{
            background: "#6c63ff", color: "#fff", border: "none", borderRadius: "14px",
            padding: "14px 32px", fontSize: "1rem", fontFamily: "'Syne', sans-serif",
            fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block",
          }}
        >
          Fazer login →
        </a>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0f", display: "flex",
        alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem",
        padding: "2rem", textAlign: "center",
      }}>
        <div style={{ fontSize: "3rem" }}>⛔</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#f0eef8" }}>
          Sem permissão
        </h2>
        <p style={{ color: "#a09cb8", maxWidth: "400px", lineHeight: 1.6 }}>
          Você não tem permissão para acessar este painel. Apenas o dono da plataforma pode visualizar estes dados.
        </p>
        <a
          href="/"
          style={{
            background: "transparent", color: "#a09cb8", border: "1px solid rgba(108,99,255,0.2)",
            borderRadius: "14px", padding: "14px 32px", fontSize: "1rem", fontFamily: "'Syne', sans-serif",
            fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block",
          }}
        >
          ← Voltar ao início
        </a>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f", color: "#f0eef8",
      fontFamily: "'DM Sans', sans-serif", padding: "2rem",
    }}>
      {/* Nav */}
      <nav style={{
        position: "fixed", top: "1.5rem", left: "50%", transform: "translateX(-50%)",
        background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(108,99,255,0.2)", borderRadius: "100px",
        padding: "10px 20px", display: "flex", alignItems: "center", gap: "1rem",
        zIndex: 100, fontSize: "0.85rem", color: "#6b6785",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f0eef8" }}>
          Form<span style={{ color: "#6c63ff" }}>Carrer</span>
        </span>
        <span>|</span>
        <span>Painel Admin</span>
        <span style={{ background: "rgba(0,212,170,0.15)", color: "#00d4aa", borderRadius: "100px", padding: "2px 10px", fontSize: "0.75rem" }}>
          Admin
        </span>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", paddingTop: "6rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.2)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "1rem",
            fontSize: "12px", color: "#6c63ff", letterSpacing: "2px", textTransform: "uppercase",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6c63ff" }} />
            Painel Administrativo
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
                Registros de Usuários
              </h1>
              <p style={{ color: "#a09cb8", fontSize: "1rem" }}>
                Todos os cursos e períodos coletados ao clicar em "Começar agora".
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                onClick={() => refetch()}
                style={{
                  background: "transparent", color: "#a09cb8", border: "1px solid rgba(108,99,255,0.2)",
                  borderRadius: "12px", padding: "10px 20px", fontSize: "0.9rem",
                  fontFamily: "'Syne', sans-serif", fontWeight: 600, cursor: "pointer",
                }}
              >
                ↻ Atualizar
              </button>
              <button
                onClick={handleExportCsv}
                disabled={exportLoading || !registros?.length}
                style={{
                  background: registros?.length ? "#6c63ff" : "rgba(108,99,255,0.3)",
                  color: "#fff", border: "none", borderRadius: "12px", padding: "10px 20px",
                  fontSize: "0.9rem", fontFamily: "'Syne', sans-serif", fontWeight: 600,
                  cursor: registros?.length ? "pointer" : "not-allowed", transition: "all 0.2s",
                }}
              >
                {exportLoading ? "Exportando..." : "⬇ Exportar CSV"}
              </button>
              <a
                href="/"
                style={{
                  background: "transparent", color: "#a09cb8", border: "1px solid rgba(108,99,255,0.2)",
                  borderRadius: "12px", padding: "10px 20px", fontSize: "0.9rem",
                  fontFamily: "'Syne', sans-serif", fontWeight: 600, cursor: "pointer",
                  textDecoration: "none", display: "inline-flex", alignItems: "center",
                }}
              >
                ← Início
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        {registros && (
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "Total de registros", value: registros.length, color: "#6c63ff" },
              { label: "Cursos distintos", value: new Set(registros.map((r) => r.curso)).size, color: "#00d4aa" },
              { label: "Períodos distintos", value: new Set(registros.map((r) => r.periodo)).size, color: "#ff9500" },
            ].map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.15)",
                borderRadius: "16px", padding: "1.25rem 1.5rem", flex: "1", minWidth: "160px",
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "0.82rem", color: "#6b6785", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#a09cb8" }}>Carregando registros...</div>
        )}

        {error && (
          <div style={{
            background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)",
            borderRadius: "16px", padding: "2rem", textAlign: "center", color: "#ff6b6b",
          }}>
            Erro ao carregar registros. Verifique sua conexão.
          </div>
        )}

        {registros && registros.length === 0 && (
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.15)",
            borderRadius: "16px", padding: "4rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Nenhum registro ainda
            </h3>
            <p style={{ color: "#a09cb8" }}>
              Os dados aparecerão aqui quando usuários clicarem em "Começar agora".
            </p>
          </div>
        )}

        {registros && registros.length > 0 && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Curso</th>
                  <th>Período</th>
                  <th>Data / Hora</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((r, i) => (
                  <tr key={r.id}>
                    <td style={{ color: "#6b6785", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
                      {registros.length - i}
                    </td>
                    <td>
                      <span style={{
                        background: "rgba(108,99,255,0.12)", color: "#a29bfe",
                        borderRadius: "8px", padding: "4px 10px", fontSize: "0.82rem", fontWeight: 500,
                      }}>
                        {r.curso}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        background: "rgba(0,212,170,0.1)", color: "#00d4aa",
                        borderRadius: "8px", padding: "4px 10px", fontSize: "0.82rem", fontWeight: 500,
                      }}>
                        {r.periodo}
                      </span>
                    </td>
                    <td style={{ color: "#a09cb8", fontSize: "0.85rem" }}>
                      {new Date(r.createdAt).toLocaleString("pt-BR", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
