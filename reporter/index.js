'use strict';

var JSHINT = require("jshint").JSHINT;

var reports;

exports.setup = function(config, deferred) {

  reports = {
    total : {},
    summary : {}
  };

  deferred.resolve();
};

exports.process = function(options, deferred) {
  var report;

  var results = lint(options.source, options.options, options.globals);

  try {
    report = generateReport(results);
  } catch(e) {
    deferred.reject(e);
  }

  reports.summary[options.filename] = {
    messages : report.messages.length
  };

  deferred.resolve(report);
};


exports.teardown = function(config, deferred) {
  reports = undefined;
  deferred.resolve();
};

exports.aggregate = function(options, deferred) {
  deferred.resolve(reports);
};

function generateReport(data) {

  var out = {
    messages : []
  };

  data.results.forEach(function (result) {
    out.messages.push({
      severity : 'error',
      line     : result.error.line,
      column   : result.error.character,
      message  : result.error.reason,
      source   : result.error.raw
    });
  });

  return out;
}

function lint(source, config, globals) {
  config = config || {};

  var results = [];
  var data = [];

  // Remove potential Unicode BOM.
  source = source.replace(/^\uFEFF/, "");

  if (!JSHINT(source, config, globals)) {
    JSHINT.errors.forEach(function (err) {
      if (err) results.push({ error: err });
    });
  }

  var lintData = JSHINT.data();
  if (lintData) data.push(lintData);

  return {
    results : results,
    data : data
  };
}