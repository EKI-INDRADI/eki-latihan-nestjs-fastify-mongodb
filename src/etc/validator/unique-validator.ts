import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// https://docs.nestjs.com/techniques/mongodb
// https://mongoosejs.com/docs/api.html#Connection
// https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va

// version 1
// import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

// version 2
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from 'src/user/entities/user.entity';
// import { Model, Schema } from 'mongoose';

// version 3
// import { Injectable } from '@nestjs/common';
// import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(
        // version 1
        @InjectConnection() private MongoDbConnection: Connection,

        // version 2
        // @InjectModel(User.name) private userRepo: Model<User>,

        // version 3
        // private userService: UserService
    ) { }

    async validate(value: any, args: ValidationArguments) {

        let findCondition = { [args.constraints[1]]: args.value }

        if (args.object['id']) {
            findCondition['id'] = {
                $ne: args.object['id']
            }
        }

        let check: any = null

        // if (args.constraints[0] == 'User') { // karena menggunakan args.constraints[0] // maka tidak digunakan if lagi
        // SOLVED :
        // useContainer(app.select(AppModule), { fallbackOnErrors: true });
        // src\main.ts
        // reference : https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va

        // //version 1 (menggunakan service)
        // check = await this.userService.manualQuery('findOne', findCondition)

        // //version 2 (menggunakan model repository)
        // check = await this.userRepo.findOne(findCondition);

        // //version 3 (menggunakan mongo conection langsung)
        // check = await this.MongoDbConnection.model(args.constraints[0]).findOne(findCondition)
        // }

        check = await this.MongoDbConnection.model(args.constraints[0]).findOne(findCondition)

        if (check) return false
        return true
    }

    defaultMessage(args: ValidationArguments) {
        return args.property + ' ' + args.value + ' sudah digunakan'
    }

}

export function IsUnique(option: any, validationOption?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsUnique',
            target: object.constructor,
            propertyName: propertyName,
            constraints: option,
            options: validationOption,
            validator: UniqueValidator,
            async: true
        })
    }
}


