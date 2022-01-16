import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

// export const InjectUser = (...args: string[]) => SetMetadata('inject-user', args);
export const InjectUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    // tujuannya adalah untuk mengisi user pada produk 
    // @IsObject()  
    // user: UserDto 
    // src\produk\dto\create-produk.dto.ts
    // req.body.user = { id : req.user.id} // DATA INI RESULT JIKA KONDISI SUDAH LOGIN

    // let UserLogin = { ...req.user }
    // delete UserLogin.password

    // src\auth\auth.controller.ts
    // src\auth\auth.service.ts
    // src\auth\jwt.strategy.ts
    let UserLogin = { ...req.user.payload_login }
    delete UserLogin._id
    delete UserLogin.__v
    req.body.user = UserLogin
    // console.log('src/etc/decorator/inject-user.decorator.ts =========== log :')
    // console.log(UserLogin)
    return req.body
})