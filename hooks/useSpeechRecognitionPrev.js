// a little modified hook from https://github.com/elassari19/speech/blob/main/src/useSpeechRecognition.js
import { useEffect, useState } from 'react'

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = null

// as of Feb 2024, on Firefox window object may not have the SpeechRecognition class
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
}

export const useSpeechRecognitionPrevious = () => {
    const [text, setText] = useState('')
    const [isListening, setIsListening] = useState(false)

    useEffect(() => {
        handleListen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening])

    const handleListen = () => {
        if (!recognition) {
            return
        }

        if (!isListening) {
            recognition.stop()
            recognition.onend = () => {
                recognition.stop()
                setText('')
            }
            return
        }
        if (isListening) {
            recognition.start()
            recognition.onend = () => {
                recognition.start()
            }
        }

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('')
            console.log(transcript)
            setText(transcript)
            recognition.onerror = (event) => {
                console.log(event.error)
            }
        }
    }

    const start = () => setIsListening(true)
    const stop = () => setIsListening(false)

    return {
        text,
        start,
        stop,
        isListening,
        hasRecgonitionSupport: !!recognition,
    }
}
