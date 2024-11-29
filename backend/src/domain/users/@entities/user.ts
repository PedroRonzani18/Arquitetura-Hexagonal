import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UserProps = {
    name: string
    email: string
    password: string
};

export class User extends Entity<UserProps> {

    constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get name() { return this.props.name }
    get email() { return this.props.email }
    get password() { return this.props.password }
}
