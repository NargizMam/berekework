import FirstHeading from '../models/heading/firstHeadingModel';
import SecondHeading from '../models/heading/secondHeadingModel';
import ThirdHeading from '../models/heading/thirdHeadingModel';
import { ModelType } from '../types';

export const modelMapping: ModelType = {
  firstHeading: FirstHeading,
  secondHeading: SecondHeading,
  thirdHeading: ThirdHeading,
};
