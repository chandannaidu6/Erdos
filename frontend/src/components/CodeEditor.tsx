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
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="C++">C++</option>


        </select>
    </div>
}