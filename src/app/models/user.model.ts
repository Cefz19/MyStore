export interface User {
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    password: string;
    avatar: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}