export function randomStr(len: number = 8) {
  const _len = len || 8;
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let n = "";
  for (let i = 0; i < _len; i++) {
    const c = chars.charAt(Math.floor(Math.random() * chars.length));
    n += c;
  }
  return n;
}
