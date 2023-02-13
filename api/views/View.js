class View {
  format;
  viewFn;

  constructor(format = '', viewFn = (entity) => any) {
    this.format = format;
    this.viewFn = viewFn;
  }

  get format() {
    return this.format;
  }

  get viewFn() {
    return this.viewFn;
  }
}

module.exports = View;
