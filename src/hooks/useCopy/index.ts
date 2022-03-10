import { ElMessage } from "element-plus";

// 文本复制
export const useCopy = (text: string) => {
  // 创建输入框
  let copyArea = document.createElement("input");
  copyArea.value = text;
  document.body.appendChild(copyArea);

  // 选中输入框
  copyArea.select();
  // Copy
  document.execCommand("Copy");
  // 移除输入框
  document.body.removeChild(copyArea);

  ElMessage.success("已复制");
};
