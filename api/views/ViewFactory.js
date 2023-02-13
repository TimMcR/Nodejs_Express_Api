const View = require('./View');

class ViewBuilder {
  Views;

  constructor() {
    this.Views = [];
  }

  addView = function (format = '', viewFn = (entity) => any) {
    this.Views.push(new View(format, viewFn));
  };

  getView = function (format) {
    let viewResult = null;
    this.Views.forEach((view) => {
      if (view.format === format) {
        viewResult = view.viewFn;
      }
    });

    //TODO extract this to custom error
    if (!viewResult) throw Error('Format type not supported');

    return viewResult;
  };
}

module.exports = ViewBuilder;
