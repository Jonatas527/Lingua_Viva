
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function TesteSupabase() {
  const [status, setStatus] = useState("Testando conexão...");

  useEffect(() => {
    async function testarConexao() {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) {
          setStatus("Erro: " + error.message);
          return;
        }

        setStatus("Conexão com Supabase estabelecida!");
      } catch {
        setStatus("Não foi possível conectar ao Supabase.");
      }
    }

    testarConexao();
  }, []);

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <p>{status}</p>
    </div>
  );
}

export default TesteSupabase;
