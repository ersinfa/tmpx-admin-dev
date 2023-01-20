export type Module = {
  id: number;
  name: string;
  description: string;
  tab: string;
  time?: string;
  dueDate?: string;
  videoUrl: string;
  sessionId?: number;
  createdAt?: string;
  updatedAt?: string;
  fileId?: string;
};

export type Session = {
  session: Module;
  id: number;
  name: string;
  description: string;
  type: string;
  code: string;
  price: string;
  modules?: Module[];
  documents?: Document[];
  createdAt?: string;
  updatedAt?: string;
};

export type Document = {
  id: number;
  name: string;
  type: string;
  path?: string;
  sessionId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  username?: string;
  gender?: string;
  ageRange?: string;
  religiousStatus?: string;
  town?: string;
  address?: string;
  bio?: string;
  showProfileFlag?: boolean;
  avatarId?: string;
};
