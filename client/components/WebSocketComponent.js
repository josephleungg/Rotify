import { useEffect, useState, useRef } from 'react';

// Call this component in the page where the chat is appearing
// use summaryContext to pass the summary of the topic you are inquiring about
// <WebSocketComponent summaryContext={"STRING"} />

const WebSocketComponent = ({ summaryContext }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isConnected, setIsConnected] = useState(false); // Track connection status
    const ws = useRef(null);

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
                content: 'you are a assistant answering questions about this topic: ' + summaryContext
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
                setIsTyping(true);
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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>WebSocket Chat</h1>
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    height: '400px',
                    overflowY: 'auto',
                    marginBottom: '10px',
                    position: 'relative',
                }}
            >
                {/* Close button (X) */}
                <button
                    onClick={handleCloseConnection}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer',
                        color: '#dc3545',
                    }}
                    title="Close Connection"
                >
                    ×
                </button>

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.role === 'user' ? 'right' : 'left',
                            marginBottom: '10px',
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                backgroundColor: msg.role === 'user' ? '#007bff' : '#f1f1f1',
                                color: msg.role === 'user' ? '#fff' : '#000',
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                backgroundColor: '#f1f1f1',
                                color: '#000',
                            }}
                        >
                            Typing...
                        </span>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    disabled={!isConnected} // Disable input if not connected
                />
                <button
                    onClick={sendMessage}
                    style={{
                        marginLeft: '10px',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                    disabled={!isConnected} // Disable send button if not connected
                >
                    Send
                </button>
            </div>
            <button
                onClick={handleReconnect}
                style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: isConnected ? '#28a745' : '#dc3545',
                    color: '#fff',
                    cursor: 'pointer',
                }}
            >
                Reconnect
            </button>
        </div>
    );
};

export default WebSocketComponent;