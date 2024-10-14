import { Inject, Injectable } from "@nestjs/common";
import { SPSO } from "../spso.entity";
import * as bcrypt from 'bcrypt';
import { UUID } from "crypto";
import { CUSTOMER_REPOSITORY, Role, SPSO_REPOSITORY } from "src/common/contants";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(SPSO_REPOSITORY) private readonly spsoRepository: typeof SPSO,
        @Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof SPSO,
        private readonly jwtService: JwtService,
    ) {}

    public async login(user, role: Role) {
        const accessTokenPayload = {
            id: user.id,
            role
        }

        const accessToken = await this.generateAccessToken(accessTokenPayload);
        
        delete user.password;
        return { user, accessToken };
    }

    public async generateAccessToken(payload) {
        const token = await this.jwtService.signAsync(payload);
        return token;
    }

    async validateSPSO(username: string, enteredPassword: string) {
        const existedSpso: SPSO = await this.spsoRepository.findOne({
            where: {
                username
            }
        });

        if (!existedSpso) {
            return null;
        }

        const passwordMatched: boolean = await this.comparePassword(enteredPassword, existedSpso.password);
        if (!passwordMatched) {
            return null;
        }

        const { password, ...result } = existedSpso['dataValues'];
        return result;
    }

    async validateCustomer(username: string, enteredPassword: string) {
        const existedCustomer: SPSO = await this.customerRepository.findOne({
            where: {
                username
            }
        });

        if (!existedCustomer) {
            return null;
        }

        const passwordMatched: boolean = await this.comparePassword(enteredPassword, existedCustomer.password);
        if (!passwordMatched) {
            return null;
        }

        const { password, ...result } = existedCustomer['dataValues'];
        return result;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    async decodeAccessToken(token: string) {
        return await this.jwtService.verifyAsync(token);
    }
}