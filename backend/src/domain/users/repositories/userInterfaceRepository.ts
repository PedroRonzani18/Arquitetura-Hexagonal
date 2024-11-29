import { User, UserProps } from "../@entities/user"

export interface UsersRepository {
    create(data: UserProps): Promise<User>
    findByName(name: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    login(email: string, password: string): Promise<User | null>
    list(): Promise<User[]>
}