import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const WebSocketComponent = ({ summaryContext }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isConnected, setIsConnected] = useState(false); // Track connection status
    const ws = useRef(null);
    const chatContainerRef = useRef(null); // Ref for the chat container

    // Function to establish WebSocket connection
    const connectWebSocket = () => {
        ws.current = new WebSocket('ws://localhost:3000');

        ws.current.onopen = () => {
            console.log('Connected to WebSocket server');
            setIsConnected(true); // Update connection status used for reconnect

            // Send initialization data as JSON to teach chatbot about the role and summary
            const initData = {
                type: 'init',
                role: 'developer',
                content: 'you are a assistant answering questions about this topic: ' + summaryContext,
            };
            ws.current.send(JSON.stringify(initData));
        };

        ws.current.onmessage = (event) => {
            const message = event.data;

            if (message === '\n\n') {
                // End of the response stream to set in the chat box
                setIsTyping(false);
            } else {
                // Append the chunk to the last message
                setIsTyping(true);
                setMessages((prevMessages) => {
                    const lastMessage = prevMessages[prevMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant') {
                        // If the last message is from the assistant, append to it
                        return [
                            ...prevMessages.slice(0, -1),
                            { ...lastMessage, content: lastMessage.content + message },
                        ];
                    } else {
                        // Otherwise, create a new assistant message
                        return [...prevMessages, { role: 'assistant', content: message }];
                    }
                });
            }
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
            setIsConnected(false); // Update connection status
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false); // Update connection status on error
        };
    };

    // Establish connection on component mount
    useEffect(() => {
        connectWebSocket();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    // Auto-scroll to the bottom when messages update
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]); // Trigger this effect whenever messages change

    // Function to reconnect WebSocket
    const handleReconnect = () => {
        if (ws.current) {
            ws.current.close(); // Close existing connection if any
        }
        setMessages([]); // Clear chat history
        connectWebSocket(); // Reconnect connection to WS
    };

    // Function to close WebSocket connection
    const handleCloseConnection = () => {
        if (ws.current) {
            ws.current.close(); // Close the WebSocket connection
            setIsConnected(false); // Update connection status
            console.log('WebSocket connection closed manually');
        }
    };

    const sendMessage = () => {
        if (!input.trim()) {
            console.log('Cannot send an empty message');
            return; // Exit the function early
        }

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            // Add user message to the chat history
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'user', content: input },
            ]);
            ws.current.send(input);
            setInput('');
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <div className="border border-[#414558] rounded-3xl p-3 max-w-[480px] w-[480px] max-h-[823px] min-h-[823px] h-[823px] overflow-y-auto relative flex flex-col">
            {/* Chat Messages Container */}
            <div
                ref={chatContainerRef} // Attach the ref to the chat container
                className="flex-1 overflow-y-auto rounded-t-xl"
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-3 text-${msg.role === 'user' ? 'right' : 'left'}`}
                    >
                        <span
                            className={`inline-block px-3 py-2 ${
                                msg.role === 'user'
                                    ? 'bg-blue-500 text-white text-right ml-12 rounded-l-xl rounded-tr-xl'
                                    : 'bg-[#414558] text-white mr-12 rounded-r-xl rounded-tl-xl'
                            }`}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input and Buttons Container */}
            <div className="relative flex items-center gap-2 border-t border-t-[#414558] pt-1">
                {/* Input Field */}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 p-2 pl-4 pr-12 bg-transparent text-textGray outline-none"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    disabled={!isConnected} // Disable input if not connected
                />

                {/* Send Button */}
                <div
                    className="p-3 rounded-full bg-[#414558] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-9 h-9 flex items-center justify-center"
                    onClick={sendMessage}
                    disabled={!isConnected || !input.trim()} // Disable send button if not connected or input is empty
                >
                    <FontAwesomeIcon icon={faPaperPlane} className="text-white w-4 h-4" />
                </div>

                {/* Reconnect Button */}
                <div
                    className="p-3 rounded-full bg-[#414558] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-9 h-9 flex items-center justify-center"
                    onClick={handleReconnect}
                >
                    <FontAwesomeIcon icon={faArrowRotateRight} className="text-white w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default WebSocketComponent;