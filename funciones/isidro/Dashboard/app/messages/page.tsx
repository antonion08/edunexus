"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, User, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// Mock data for the messaging system
const conversations = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage: "Let me know if you have questions about the assignment.",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Prof. Michael Johnson",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage: "Great work on the presentation today!",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Sarah Williams",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage: "The next assignment will be posted tomorrow.",
    time: "Yesterday",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "Advanced Data Structures Group",
    avatar: "",
    isGroup: true,
    lastMessage: "Alex: Does anyone have notes from last class?",
    time: "Monday",
    unread: 0,
    members: 8,
  },
];

// Mock messages for the first conversation
const mockMessages = [
  {
    id: 1,
    sender: "Dr. Jane Smith",
    content: "Hi there! I wanted to check in on your progress with the programming assignment.",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Hi Dr. Smith! I'm making good progress. I've completed the first two exercises.",
    time: "10:20 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Dr. Jane Smith",
    content: "That's great! Are you having any trouble with exercise 3?",
    time: "10:25 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    content: "Actually, yes. I'm a bit confused about how to implement the recursive function.",
    time: "10:26 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Dr. Jane Smith",
    content: "Let me know if you have questions about the assignment. I'll be available for office hours tomorrow from 2-4pm.",
    time: "10:30 AM",
    isMe: false,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "Me",
      content: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      </div>
      
      <Card className="h-[calc(100vh-220px)]">
        <CardContent className="p-0 h-full">
          <div className="grid h-full md:grid-cols-[300px_1fr]">
            {/* Conversations List */}
            <div className="border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8"
                  />
                </div>
              </div>
              
              <Tabs defaultValue="all">
                <div className="px-4 pt-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="mt-0">
                  <ScrollArea className="h-[calc(100vh-340px)]">
                    {conversations.map((conversation) => (
                      <motion.div
                        key={conversation.id}
                        whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                        className={`p-3 cursor-pointer border-b ${
                          selectedConversation.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          {conversation.isGroup ? (
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                          ) : (
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={conversation.avatar} />
                                <AvatarFallback>
                                  {conversation.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              {conversation.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                              )}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{conversation.name}</p>
                              <p className="text-xs text-muted-foreground">{conversation.time}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage}
                              </p>
                              {conversation.unread > 0 && (
                                <Badge className="ml-2">{conversation.unread}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="unread" className="mt-0">
                  <ScrollArea className="h-[calc(100vh-340px)]">
                    {conversations
                      .filter(c => c.unread > 0)
                      .map((conversation) => (
                        <motion.div
                          key={conversation.id}
                          whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                          className={`p-3 cursor-pointer border-b ${
                            selectedConversation.id === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <div className="flex items-center gap-3">
                            {conversation.isGroup ? (
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                            ) : (
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={conversation.avatar} />
                                  <AvatarFallback>
                                    {conversation.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {conversation.online && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                                )}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{conversation.name}</p>
                                <p className="text-xs text-muted-foreground">{conversation.time}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground truncate">
                                  {conversation.lastMessage}
                                </p>
                                <Badge className="ml-2">{conversation.unread}</Badge>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Message Area */}
            <div className="flex flex-col h-full">
              {/* Conversation Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedConversation.isGroup ? (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <Avatar>
                      <AvatarImage src={selectedConversation.avatar} />
                      <AvatarFallback>
                        {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    {selectedConversation.isGroup ? (
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.members} members
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.online ? "Online" : "Offline"}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${message.isMe ? "order-2" : "order-1"}`}>
                        {!message.isMe && (
                          <div className="flex items-center mb-1 gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={selectedConversation.avatar} />
                              <AvatarFallback>
                                {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm font-medium">{message.sender}</p>
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            message.isMe
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">
                          {message.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}