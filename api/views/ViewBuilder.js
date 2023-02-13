const View = require('./View');
const createHttpError = require('http-errors');

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
    if (!viewResult)
      throw createHttpError(
        415,
        `Content Type '${format}' is not supported for this request`,
      );

    return viewResult;
  };
}

module.exports = ViewBuilder;
