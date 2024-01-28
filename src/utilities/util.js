export const getDogAns = (answer) => {
  return answer.length > 400 ? `${answer.substring(0, 400)}...` : answer;
};
