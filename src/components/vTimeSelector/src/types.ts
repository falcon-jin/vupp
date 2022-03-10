export default {
  startPlaceholder: {
    type: String,
    default: "开始时间",
  },
  startTimeStartAt: {
    type: String,
    default: "08:00",
  },
  startTimeEndAt: {
    type: String,
    default: "18:00",
  },
  startStep: {
    type: String,
    default: "00:15",
  },

  endPlaceholder: {
    type: String,
    default: "结束时间",
  },
  endTimeStartAt: {
    type: String,
    default: "08:00",
  },
  endTimeEndAt: {
    type: String,
    default: "18:00",
  },
  endStep: {
    type: String,
    default: "00:15",
  },
};

/**
 * 
 * Extends props
 * 
  name: "",
  clearable: true,
  disabled: false,
  editable: true,
  effect: "light",
  size: "default",
  format: "HH:mm",
  minTime: "00:00",
  maxTime: "",
  prefixIcon: "Clock",
  clearIcon: "CircleClose",
 * 
 */
