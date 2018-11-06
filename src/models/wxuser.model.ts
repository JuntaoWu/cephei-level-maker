
import Promise from "bluebird";
import mongoose, { mongo, Mongoose, MongooseDocument } from "mongoose";

import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

/**
 * WxUser Schema
 */
export class WxUser extends Typegoose {
    @prop()
    openId: String;
    @prop()
    unionId: String;
    @prop()
    session_key: String;
    @prop()
    avatarUrl?: String;
    @prop()
    city?: String;
    @prop()
    country?: String;
    @prop()
    gender?: Number;
    @prop()
    language?: String;
    @prop()
    nickName?: String;
    @prop()
    province?: String;
    @prop()
    score?: Number;
}

const WxUserModel = new WxUser().getModelForClass(WxUser, {
    schemaOptions: {
        timestamps: true,
    }
});

export default WxUserModel;