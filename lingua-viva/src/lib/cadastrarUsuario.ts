
import { supabase } from "./supabase";

type DadosNovoUsuario = {
  nome: string;
  email: string;
  senha: string;
  tipo_perfil: "Aluno" | "Responsável" | "Professor";
};

export async function cadastrarUsuario(
  dados: DadosNovoUsuario
) {
  const { data, error } = await supabase.functions.invoke(
    "criar-usuario",
    {
      body: {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        tipo_perfil: dados.tipo_perfil,
      },
    }
  );

  if (error) {
    throw new Error(
      error.message || "Não foi possível cadastrar o usuário."
    );
  }

  if (data?.erro) {
    throw new Error(data.erro);
  }

  return data;
}
