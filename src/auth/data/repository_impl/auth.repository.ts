import { Injectable } from "@nestjs/common";
import { SignInDto } from "../dto/sign-in.dto";
import { SignUpDto } from "../dto/sign-up.dto";
import { UpdateAuthDto } from "../dto/update-user.dto";
import { IAuth } from "../interfaces/auth.interface";
import { User } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthRepository } from "src/auth/domain/repository/auth.repository";

@Injectable()
export class AuthRepositoryImpl extends AuthRepository implements IAuth {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        super();
    }

    async signUpUser(createUserRequest: SignUpDto): Promise<User> {
        const createdUser = new this.userModel(createUserRequest);
        return await createdUser.save();
    }

    async signInUser(loginUserRequest: SignInDto): Promise<User> {

    const user = await this.userModel.findOne({ email: loginUserRequest.email });

    // 2. Check if user exists
    if (!user) {
      return null; // User not found
    }

    // 3. Compare passwords (bcrypt recommended)
    // **Security Best Practice:** Use a secure hashing algorithm like bcrypt to store passwords.
    // Don't compare plain text passwords directly!
    const isPasswordValid = await bcrypt.compare(loginUserRequest.password, user.password); // Replace with your password hashing logic

    // 4. Return user if password matches
    if (isPasswordValid) {
      return user;
    }

    // 5. Return null if password doesn't match
    return null;
    }

    async updateUser(updateUserRequest: UpdateAuthDto): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(updateUserRequest.id, updateUserRequest, { new: true }); // Return updated user
        if (!user) {
            return null; // User not found
        }
        await user.save();
        return user;
    }
}