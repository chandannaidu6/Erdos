import { Box, HStack } from "@chakra-ui/react";
import { CodeEditor } from "../components/CodeEditor";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CODE_SNIPPETS } from "../constants";
import { Output } from "../components/Output";
type Language = keyof typeof CODE_SNIPPETS
export const Editor = () => {
    const location = useLocation();
    const problem = location.state?.problem;
    const [language,setLanguage] = useState<Language>("javascript")
    const [code,setCode] = useState<string>(CODE_SNIPPETS[language])

    useEffect(() => {
        setCode(CODE_SNIPPETS[language])
    },[language])

    return (<div>
        <Box minH="100vh" bg="#0f0a19" color='gray'>
            <HStack spacing={4}>
                <Box w='50%'>
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
                    <p className='text-gray-500 text-lg pb-2'>{problem.description}</p>
                </div>
            )}
            <CodeEditor 
            code={code}
            language={language}
            onChange={(code) => setCode(code)}
            onLanguageChange={(newLanguage) => setLanguage(newLanguage as Language)}
            />

                </Box>
            <Output code={code} language={language}/>
            </HStack>


            

        </Box>
        </div>

    )
}