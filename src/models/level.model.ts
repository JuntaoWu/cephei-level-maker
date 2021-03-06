import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import { ObjectID } from 'bson';

class Answer {
  public time: number;
  public x: number;
  public y: number;
}

class GameObjectInfo {
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public bodyType: number;
    public angle: number;
    public offset: number;
    public hp: number;
    public speed: number;
}

/**
 * Level Schema
 */
export class Level extends Typegoose {
  @prop()
  public answer?: Answer;
  @prop()
  public name?: String;
  @prop()
  public balls?: Array<GameObjectInfo>;
  @prop()
  public walls?: Array<GameObjectInfo>;
  @prop()
  public holes?: Array<GameObjectInfo>;
  @prop()
  public stars?: Array<GameObjectInfo>;
  @prop()
  public createdBy?: String;
}

const LevelModel = new Level().getModelForClass(Level, {
  schemaOptions: {
    timestamps: true,
  }
});

export default LevelModel;