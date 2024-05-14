import { Injectable } from "@nestjs/common";
import { SignInDto } from "../dto/sign-in.dto";
import { SignUpDto } from "../dto/sign-up.dto";
import { UpdateAuthDto } from "../dto/update-user.dto";
import { IAuth } from "../interfaces/auth.interface";
import { User } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthRepository } from "src/auth/domain/repository/auth.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepositoryImpl extends AuthRepository implements IAuth {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        super();
    }

    async signUpUser(createUserRequest: SignUpDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserRequest.password, "saltOrRounds");
        createUserRequest.password = hashedPassword;
        const createdUser = new this.userModel(createUserRequest);
        return await createdUser.save();
    }

    async signInUser(loginUserRequest: SignInDto): Promise<User> {

        const user = await this.userModel.findOne({ email: loginUserRequest.email });
        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(loginUserRequest.password, user.password);
        if (isPasswordValid) {
            return user;
        }

        return null;
    }

    async updateUser(updateUserRequest: UpdateAuthDto): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(updateUserRequest.id, updateUserRequest, { new: true });
        if (!user) {
            return null; 
        }
        await user.save();
        return user;
    }
}