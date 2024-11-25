export interface User {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: Date;
  updated: Date;
  avatar: string;
  name: string;
}

export interface Todo {
  id?: string;
  title?: string;
  description?: string;
  priority?: "high" | "medium" | "low";
  done?: boolean;
  user?: string;
}
