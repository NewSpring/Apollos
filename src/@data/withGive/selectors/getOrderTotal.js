export default function getOrderTotal(state) {
  return state.contributions
    .reduce((runningTotal, c) => (runningTotal + c.amount), 0);
}
