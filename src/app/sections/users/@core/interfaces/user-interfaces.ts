export interface UserData {
    data: User[],
    page: number,
    per_page: number,
    support: Object,
    total: number,
    total_pages: number
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UpdatedUser {
    email: string;
    first_name: string;
    last_name: string;
    updatedAt: string;
}

export interface NewUser {
    id: number;
    token: string;
}

