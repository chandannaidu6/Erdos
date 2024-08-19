import { Box } from "@chakra-ui/react";
import { CodeEditor } from "../components/CodeEditor";
import { useState } from "react";
import { useLocation } from "react-router";
export const Editor = () => {
    const location = useLocation();
    const problem = location.state?.problem;
    const [code,setCode] = useState<string>("")
    const [language,setLanguage] = useState<string>("JAVASCRIPT")

    return (<div>
        <Box minH="100vh" bg="#0f0a19" color='gray'>
            {problem && (
                <div>
                    <h1 className='font-bold text-2xl'>{problem.title}</h1>
                    <p className='text-xs text-gray-500 pb-2'>{problem.difficulty}</p>
                    <p className="text-xs text-gray-500">
                        Categories:{" "}
                        {problem.problemCategories
                        .map((pc:any) => pc.category.name)
                        .join(", ")}
                    </p>
                    <p className='text-gray-500 text-lg'>{problem.description}</p>
                </div>
            )}
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