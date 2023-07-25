declare global{
    namespace NodeJS{
        interface ProcessEnv{
            NEXT_PUBLIC_KANJI_API_URL:string
        }
    }
}
export {}