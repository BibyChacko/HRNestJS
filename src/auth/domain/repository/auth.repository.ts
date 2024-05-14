import { Injectable } from "@nestjs/common";
import { SignInDto } from "src/auth/data/dto/sign-in.dto";
import { SignUpDto } from "src/auth/data/dto/sign-up.dto";
import { UpdateAuthDto } from "src/auth/data/dto/update-user.dto";
import { IAuth } from "src/auth/data/interfaces/auth.interface";
import { User } from "src/auth/data/schemas/user.schema";


@Injectable()
export abstract class AuthRepository implements IAuth {
    abstract signUpUser(createUserRequest: SignUpDto): Promise<User>;
    abstract signInUser(loginUserRequest: SignInDto): Promise<User>;
    abstract updateUser(updateUserRequest: UpdateAuthDto): Promise<User>;
}