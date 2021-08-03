/**
 * @
 * @desc: 设置异步间隔延迟
 * @author:  zhangyunajiang
 * @creatDate 2021-05-01 10:03:17
 * @param {Object} {}
 * @return  {*}
 */
export function delay(props: { interval: number }) {
  const { interval = 1 } = props;
  return new Promise((resolve: any) => {
    let timer = setTimeout((_) => {
      clearTimeout(timer);
      resolve(true);
    }, interval);
  });
}

/**
 * @desc: 把文件按照二进制进行读取
 * @author:  zhangyunajiang
 * @creatDate 2021-05-01 10:09:00
 * @param {Object} {}
 * @return  {*}
 */
export function redFile(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
}
