import { SignInDto } from "src/auth/data/dto/sign-in.dto";
import { SignUpDto } from "src/auth/data/dto/sign-up.dto";
import { UpdateAuthDto } from "src/auth/data/dto/update-user.dto";
import { User } from "src/auth/data/schemas/user.schema";


export interface IAuth {
    signUpUser(createUserRequest: SignUpDto) : Promise<User>;
    signInUser(loginUserRequest: SignInDto) : Promise<User>;
    updateUser(updateUserRequest: UpdateAuthDto) : Promise<User>;
}