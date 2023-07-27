import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL, process.env.NEXT_PUBLIC_DB_KEY);

export async function createUser(username: string) {
    const data = await supabase.from("users").insert({ username: username }).select().single();
    return data;
}

export async function selectUser(username: string) {
    const data = await supabase.from("users").select().eq("username", username).single();
    return data
}

export async function updateKanji(id: number, kanji: string, xp: number, grade: number) {
    const data = (await supabase.from("kanji-levels").select().match({ kanji, user: id }))?.data
        if (data&&data.length) {
            return (await supabase.from("kanji-levels").update({ xp: data[0].xp + xp }).match({ kanji, user: id }))
        }
        return (await supabase.from("kanji-levels").insert({ user: id, kanji, xp , grade}))
    
}

export async function addScore(id: number, score: number, grade: number) {
    return (await supabase.from("scores").insert({ user: id, score, grade }))
}

export async function getPb(id: number, grade: number) {
    return (
        (await supabase.from("scores").select()
        .match({ user: id, grade })
        .order("score", { ascending: false })
        .limit(1)
        )?.data?.[0]);
}

export async function getUserXp(id: number, grade: number) {
    return(
        (await supabase.from("kanji-levels").select()
        .match({user: id, grade}))?.data
    )
}