import { Box } from "@chakra-ui/react";
import { CodeEditor } from "../components/CodeEditor";
import { useState } from "react";
export const Editor = () => {
    const [code,setCode] = useState<string>("")
    const [language,setLanguage] = useState<string>("JAVASCRIPT")

    return (<div>
        <Box minH="100vh" bg="#0f0a19" color='gray'>
            <CodeEditor 
            code={code}
            language={language}
            onChange={(code) => setCode(code)}
            onLanguageChange={(language) => setLanguage(language)}
            />

            

        </Box>
        </div>

    )
}