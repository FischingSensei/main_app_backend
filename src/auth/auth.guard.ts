import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private jwtService: JwtService,
    ) {}

    private readonly logger: Logger = new Logger(AuthGuard.name, { timestamp: true })

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            this.logger.error(`Error no bearer token was provided for the ${context.getType()} ${context.getClass().name}`)
            return false;
        }

        let payload = {};

        try {
            payload = this.jwtService.verify(token);
        } catch {
            this.logger.error("Token is expired " + payload); 
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}