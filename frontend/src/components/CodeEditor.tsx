import React from "react"
import Editor from '@monaco-editor/react'

interface CodeEditor{
    code:string;
    onChange:(value:string) => void
    language:string;
    onLanguageChange:(value:string)=>void;
}
export const CodeEditor:React.FC<CodeEditor> = ({code,onChange,language,onLanguageChange}) =>{
    return <div>
        <select value={language} onChange={(e)=> onLanguageChange(e.target.value)}>
            <option value="JAVASCRIPT">JavaScript</option>
            <option value="PYTHON">Python</option>
            <option value="C_PLUS_PLUS">C++</option>
        </select>
        <Editor 
        height="500px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange = {(value) => onChange(value || '')}
        options={{
            automaticLayout:true,
            scrollBeyondLastLine:false,
            minimap:{enabled:false},
        }}
        />
    </div>
}