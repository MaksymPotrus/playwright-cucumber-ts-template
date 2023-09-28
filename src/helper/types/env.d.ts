export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "test",
            BASEURL: string,
            HEAD: "true" | "false"
        }
    }
}