import { Box, Text, Button } from '@chakra-ui/react';
import { executeCode } from './api';
import { constants } from '../constants';
import { useState } from 'react';

type Language = keyof typeof constants;

interface OutputProps {
    code: string;
    language: Language;
}

export const Output = ({ code, language }: OutputProps) => {
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>(''); 

    const runCode = async () => {
        if (code) {
            try {
                console.log(`Executing code in language: ${language}`);
                console.log(`Source code:\n${code}`);

                const response = await executeCode(language, code);

                console.log('Execution response:', response);

                if (response && response.run && response.run.stdout) {
                    setOutput(response.run.stdout);
                    setError('');
                } else {
                    setOutput('');
                    setError('No output received from the execution.');
                }
            } catch (error) {
                console.error('Error executing code:', error);
                setOutput('');
                setError('Error executing code. Please check the console for more details.');
            }
        } else {
            console.error('No code to execute');
            setOutput('');
            setError('No code to execute');
        }
    };

    return (
        <Box w='50%'>
            <Text mb={2} fontSize='lg'>Output</Text>
            <Button
                variant='outline'
                colorScheme='green'
                mb={4}
                onClick={runCode}
            >
                Run Code
            </Button>
            <Box
                height='75vh'
                p={2}
                border="1px solid"
                borderRadius={4}
                borderColor='#333'
                overflowY='auto'
                bg='#1a202c'
                color='white'
            >
                {error ? (
                    <Text color="red.500">{error}</Text>
                ) : (
                    <Text whiteSpace='pre-wrap'>{output}</Text>
                )}
            </Box>
        </Box>
    );
};
