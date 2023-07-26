declare global{
    namespace NodeJS{
        interface ProcessEnv{
            NEXT_PUBLIC_KANJI_API_URL:string
            NEXT_PUBLIC_DB_PASSWORD:string
            NEXT_PUBLIC_DB_URL:string
            NEXT_PUBLIC_DB_KEY:string
        }
    }
}
export {}