const formatTypes = require('../config/formatTypes');

class View {
  constructor(format, viewFn) {
    this.format = format;
    this.viewFn = viewFn;
  }
}

class ViewBuilder {
  constructor(hasHtmlView = false) {
    if (hasHtmlView) this.Views = [new View(formatTypes.html, () => {})];
    else this.Views = [];
  }

  addView = (format = '', viewFn = (entity) => any) => {
    this.Views.push(new View(format, viewFn));
  };

  getView = (format) => {
    const view = this.Views.find((view) => view.format === format);

    if (!view) throw Error('Content type not supported');

    return view.viewFn;
  };
}

module.exports = ViewBuilder;
