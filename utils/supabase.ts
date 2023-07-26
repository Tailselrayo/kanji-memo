import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL, process.env.NEXT_PUBLIC_DB_KEY);

export async function createUser(username: string) {
    const data = await supabase.from("users").insert({username: username}).select().single();
    return data;
}

export async function selectUser(username: string) {
    const data = await supabase.from("users").select().eq("username", username).single();
    return data
}