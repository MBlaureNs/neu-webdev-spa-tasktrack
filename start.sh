#!/bin/bash

export PORT=5104

cd ~/www/spa
./bin/tasktrack stop || true
./bin/tasktrack start

