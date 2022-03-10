export default {
  placeholder: {
    type: String,
    default: "请选择城市",
  },
  width: {
    type: Number,
    default: 430,
  },
};

export interface CityItemProps {
  code?: string;
  name?: string;
  spell?: string;
  label?: string;
}

export interface ProvinceItemProps {
  name?: string;
  code?: string;
  cities?: array;
  index?: string;
}
