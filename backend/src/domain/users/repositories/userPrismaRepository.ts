import { prisma } from "@/core/db/prisma";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { UsersRepository } from "./userInterfaceRepository";
import { User, UserProps } from "../@entities/user";

export class UsersPrismaRepository implements UsersRepository {
    
    async create(data: UserProps): Promise<User> {

        const user = await prisma.user.create({ data });

        return new User(user, new UniqueEntityID(user.id))
    }

    async findByName(name: string): Promise<User | null> {
        
        const user = await prisma.user.findFirst({
            where: { name }
        });

        return (user ? new User(user, new UniqueEntityID(user.id)) : null);
    }

    async findByEmail(email: string): Promise<User | null> {

        const user = await prisma.user.findFirst({
            where: { email }
        });

        return (user ? new User(user, new UniqueEntityID(user.id)) : null);
    }
    
    async login(email: string, password: string): Promise<User | null> {

        const user = await prisma.user.findFirst({
            where: { email, password }
        });

        return (user ? new User(user, new UniqueEntityID(user.id)) : null);
    }


    async list(): Promise<User[]> {

        const users = await prisma.user.findMany();

        return users.map(user => new User(user, new UniqueEntityID(user.id)));
    }
}

