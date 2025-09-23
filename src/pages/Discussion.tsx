import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageSquare, 
  Send, 
  Reply, 
  Edit2, 
  Trash2,
  Plus,
  Pin,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Dr. Smith',
  email: 'smith@health.gov',
  role: 'staff' as const,
};

interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole: 'admin' | 'staff';
  message: string;
  timestamp: string;
  parentId?: string;
  isPinned?: boolean;
}

const Discussion: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  // Mock discussion data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Dr. Admin',
      userRole: 'admin',
      message: 'Welcome to the team discussion forum! Please use this space to share insights, ask questions, and coordinate our surveillance efforts.',
      timestamp: '2024-01-15T10:00:00Z',
      isPinned: true,
    },
    {
      id: '2',
      userId: '3',
      userName: 'Dr. Garcia',
      userRole: 'staff',
      message: 'Has anyone noticed an increase in malaria cases in the Eastern region? I\'ve uploaded several positive samples this week.',
      timestamp: '2024-01-15T14:30:00Z',
    },
    {
      id: '3',
      userId: '1',
      userName: 'Dr. Smith',
      userRole: 'staff',
      message: 'Yes, I\'ve seen similar patterns. The House Index calculations are showing elevated risk levels. Should we coordinate additional surveillance activities?',
      timestamp: '2024-01-15T15:45:00Z',
      parentId: '2',
    },
    {
      id: '4',
      userId: '4',
      userName: 'Dr. Johnson',
      userRole: 'staff',
      message: 'I can help with additional sampling in the Eastern region. What specific areas should we prioritize?',
      timestamp: '2024-01-15T16:20:00Z',
      parentId: '2',
    },
    {
      id: '5',
      userId: '2',
      userName: 'Dr. Admin',
      userRole: 'admin',
      message: 'Great coordination team! I\'ve updated the surveillance protocols based on the recent findings. Please check the new guidelines in the reports section.',
      timestamp: '2024-01-16T09:15:00Z',
    },
  ]);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsPosting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const message: Message = {
        id: Date.now().toString(),
        userId: mockUser.id,
        userName: mockUser.name,
        userRole: mockUser.role,
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to post message:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyMessage.trim()) return;

    setIsPosting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const reply: Message = {
        id: Date.now().toString(),
        userId: mockUser.id,
        userName: mockUser.name,
        userRole: mockUser.role,
        message: replyMessage.trim(),
        timestamp: new Date().toISOString(),
        parentId,
      };
      
      setMessages(prev => [...prev, reply]);
      setReplyMessage('');
      setReplyTo(null);
    } catch (error) {
      console.error('Failed to post reply:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const canDeleteMessage = (message: Message) => {
    return (mockUser.role as string) === 'admin' || message.userId === mockUser.id;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const getThreadMessages = () => {
    const threads: { [key: string]: Message[] } = {};
    const rootMessages: Message[] = [];

    // Separate root messages and replies
    messages.forEach(msg => {
      if (msg.parentId) {
        if (!threads[msg.parentId]) {
          threads[msg.parentId] = [];
        }
        threads[msg.parentId].push(msg);
      } else {
        rootMessages.push(msg);
      }
    });

    // Sort replies by timestamp
    Object.keys(threads).forEach(key => {
      threads[key].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    });

    return { rootMessages: rootMessages.sort((a, b) => {
      // Pinned messages first, then by timestamp
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }), threads };
  };

  const { rootMessages, threads } = getThreadMessages();

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-warning" />
            Team Discussion
          </h1>
          <p className="text-muted-foreground mt-2">
            Collaborate with your surveillance team, share insights, and coordinate activities
          </p>
        </div>

        <div className="space-y-6">
          {/* New Message Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Start New Discussion
              </CardTitle>
              <CardDescription>
                Share updates, ask questions, or coordinate with your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostMessage} className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts, ask questions, or provide updates..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {mockUser.role === 'staff' ? (
                      'You can edit and delete your own messages'
                    ) : (
                      'As an admin, you can moderate all messages'
                    )}
                  </div>
                  <Button type="submit" disabled={!newMessage.trim() || isPosting}>
                    {isPosting ? 'Posting...' : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Post Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Discussion Guidelines */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Discussion Guidelines:</strong> Stay professional, respect team members, 
              focus on surveillance activities, and use clear, descriptive language when discussing cases or findings.
            </AlertDescription>
          </Alert>

          {/* Messages */}
          <div className="space-y-4">
            {rootMessages.map((message) => (
              <div key={message.id}>
                {/* Root Message */}
                <Card className={message.isPinned ? 'border-primary bg-primary/5' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {message.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">{message.userName}</h4>
                          <Badge variant={message.userRole === 'admin' ? 'default' : 'secondary'}>
                            {message.userRole}
                          </Badge>
                          {message.isPinned && (
                            <Badge variant="outline" className="text-primary">
                              <Pin className="h-3 w-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyTo(replyTo === message.id ? null : message.id)}
                          >
                            <Reply className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                          
                          {canDeleteMessage(message) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMessage(message.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Replies */}
                {threads[message.id] && (
                  <div className="ml-14 space-y-3 mt-3">
                    {threads[message.id].map((reply) => (
                      <Card key={reply.id} className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                                {reply.userName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium text-sm">{reply.userName}</h5>
                                <Badge variant={reply.userRole === 'admin' ? 'default' : 'secondary'} className="text-xs">
                                  {reply.userRole}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(reply.timestamp)}
                                </span>
                              </div>
                              
                              <p className="text-sm text-foreground whitespace-pre-wrap">{reply.message}</p>
                              
                              {canDeleteMessage(reply) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteMessage(reply.id)}
                                  className="text-destructive hover:text-destructive mt-2 h-auto p-1 text-xs"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyTo === message.id && (
                  <div className="ml-14 mt-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <Textarea
                            placeholder={`Reply to ${message.userName}...`}
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            rows={3}
                            className="resize-none"
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReplyTo(null);
                                setReplyMessage('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReply(message.id)}
                              disabled={!replyMessage.trim() || isPosting}
                            >
                              {isPosting ? 'Posting...' : 'Post Reply'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ))}
          </div>

          {messages.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No discussions yet</h3>
                <p className="text-muted-foreground">
                  Be the first to start a discussion with your team!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;