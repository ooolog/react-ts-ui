import devWarning,{ resetWarned } from "../../t-util/warning";

export { resetWarned };

export default (valid: boolean, component: string, message: string): void => {
  devWarning(valid, `[t-ui: ${component}] ${message}`);
};
