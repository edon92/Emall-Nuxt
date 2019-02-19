const _mm = {
  validate(value, type = 'require') {
    if (type === "require") {
      return !!value;
    }
    if (type === "phone") {
      return /^1\d{10}$/.test(value);
    }
    if (type === "email") {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  }
}
export default _mm
