import 'regenerator-runtime' // important! must be imported before "react-speech-recognition"
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition'
import { useSpeechRecognitionPrevious } from '../hooks/useSpeechRecognitionPrev'

// eslint-disable-next-line react/prop-types
export const SpeechRecognitionComp = ({ variant = 'default' }) => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
        resetTranscript,
    } = useSpeechRecognition()

    const { hasRecgonitionSupport } = useSpeechRecognitionPrevious()

    const startListening = () =>
        SpeechRecognition.startListening({ continuous: true })

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn&apos;t support speech recognition.</span>
    }

    if (!isMicrophoneAvailable) {
        return <span>Microphone is not available.</span>
    }

    return (
        <>
            <span>
                previous: {hasRecgonitionSupport ? 'Has support' : 'No support'}
            </span>

            <div className="card">
                <p>Microphone: {listening ? 'on' : 'off'}</p>

                {variant === 'default' ? (
                    <>
                        <button onClick={SpeechRecognition.startListening}>
                            Start
                        </button>

                        <button onClick={SpeechRecognition.stopListening}>
                            Stop
                        </button>

                        <button onClick={resetTranscript}>Reset</button>
                    </>
                ) : (
                    <button
                        onTouchStart={startListening}
                        onMouseDown={startListening}
                        onTouchEnd={SpeechRecognition.stopListening}
                        onMouseUp={SpeechRecognition.stopListening}
                    >
                        Hold to talk
                    </button>
                )}

                <p>{transcript}</p>
            </div>
        </>
    )
}
