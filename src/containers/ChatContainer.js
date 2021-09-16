import AuthProvider from '../contexts/AuthProvider';
import ChatWindow from '../components/ChatWindow';
import SocketProvider from '../contexts/SocketProvider';

export default function ChatContainer() 
{
  return (
      <AuthProvider>
        <SocketProvider>
            <ChatWindow />
        </SocketProvider>
      </AuthProvider>
  );
}