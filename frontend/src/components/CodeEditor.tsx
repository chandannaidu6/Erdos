import React from "react";
import Editor from '@monaco-editor/react';
import { Box } from "@chakra-ui/react";
import { constants } from "../constants";

interface CodeEditorProps {
    code: string;
    onChange: (value: string) => void;
    language: string;
    onLanguageChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language, onLanguageChange }) => {
    const languages = Object.entries(constants);

    return (
        <div>
            <select value={language} onChange={(e) => onLanguageChange(e.target.value)}>
                {languages.map(([langKey, version]) => (
                    <option key={langKey} value={langKey}>
                        {`${langKey.toUpperCase()} - ${version}`}
                    </option>
                ))}
            </select>
            <Box>
                <Editor
                    height="500px"
                    language={language}
                    value={code}
                    theme="vs-dark"
                    onChange={(value) => onChange(value || '')}
                    options={{
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        minimap: { enabled: false },
                    }}
                />
            </Box>
        </div>
    );
};
