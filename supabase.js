// supabase.js

const SUPABASE_URL = 'https://zoyiphlxylsxhefmkcwz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_bgyHgeKxR7-3ftWx0wYVxg_5k_n7Pzx';

// Cria o cliente global
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para listar os sistemas ativos, ordenados
async function listarSistemas() {
    const { data, error } = await window.supabaseClient
        .from('sistemas')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

    if (error) {
        console.error('Erro ao buscar sistemas:', error);
        return [];
    }
    return data;
}

// Função para registrar o clique no sistema (log de auditoria)
async function registrarAcesso(sistemaId) {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session) return;

    await window.supabaseClient
        .from('acessos')
        .insert({
            user_id: session.user.id,
            sistema_id: sistemaId
        });
}

// Função para sair
async function fazerLogout() {
    await window.supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}