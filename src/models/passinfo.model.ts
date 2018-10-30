import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import { ObjectID } from 'bson';

class PassStar {
    public stars: number;
}

/**
 * PassInfo Schema
 */
export class PassInfo extends Typegoose {
    @prop()
    public openId: String;
    @prop()
    public passInfo?: Array<PassStar>;
    @prop()
    public restoredAt?: Date;
    @prop()
    public currentPower?: Number;
    @prop()
    public createdBy?: String;
}

const PassInfoModel = new PassInfo().getModelForClass(PassInfo, {
    schemaOptions: {
        timestamps: true,
    }
});

export default PassInfoModel;