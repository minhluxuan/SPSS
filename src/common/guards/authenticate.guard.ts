import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom, map, Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/user/services/auth.service';
import { SpsoService } from 'src/modules/user/services/spso.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(
		private readonly spsoService : SpsoService,
		private readonly authService : AuthService,
	) {
		super();
	};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        let token: string = request.headers['authorization'];
        if (!token) {
			throw new UnauthorizedException('Please login to continue');
        }

        if (token.startsWith('Bearer ')) {
			token = token.replace('Bearer ', '');
		}

		try {
			const payload = await this.authService.decodeAccessToken(token);
			request.user = payload; // Lưu thông tin user vào request để sử dụng trong các controller
			return true;
		} catch (err) {
			throw new UnauthorizedException('Invalid token');
		}
    }
}
