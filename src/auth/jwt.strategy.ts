import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        })
    }

    async validate(payload: any) {
        let user = await this.userService.findOne(payload.id)

        let payload_custom: any = {}
        if (payload.user_payload && payload.user_payload) {
            payload_custom = { ...payload.user_payload }
            delete payload_custom.password
        }

        if (user) {
            let res_json: any = {
                id: user.id,
                nama_user: user.nama_user,
                payload_login: payload_custom
            }
            return res_json
        }
        else {
            throw new UnauthorizedException()
        }
    }

}