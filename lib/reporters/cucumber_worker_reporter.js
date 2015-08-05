/**
 * Copyright 2014 Skytap Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var Cucumber = require('cucumber');

function sendResults (event) {
  var data = event.toJSON();

  try {
    process.send({
      type : 'testResults',
      data : data
    });
  } catch (e) {
    console.log("CucumberWorkerReporter: Error sending test results for event '" +  event.getName() + "'.", e.stack)
    process.exit(1);
  }
}

function CucumberWorkerReporter(options) {
  if (options == null) {
    options = {};
  }

  var self = Cucumber.Listener.Formatter(options);

  self.hear = function hear(event, callback) {
    sendResults(event);
    callback();
  };

  return self;
}

module.exports = CucumberWorkerReporter;