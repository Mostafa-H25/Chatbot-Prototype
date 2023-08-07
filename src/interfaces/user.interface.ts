interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
  userCategory: string;
  createdAt: Date;
  isVerified: boolean;
  isAuthenticated: boolean;
}
