#!/bin/bash

export PORT=5104
export MIX_ENV=prod
export GIT_PATH=/home/spa/src/spa 

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "spa" ]; then
	echo "Error: must run as user 'spa'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest

mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/spa ]; then
	echo mv ~/www/spa ~/old/$NOW
	mv ~/www/spa ~/old/$NOW
fi

mkdir -p ~/www/spa
REL_TAR=~/src/spa/_build/prod/rel/tasktrack/releases/0.0.1/tasktrack.tar.gz
(cd ~/www/spa && tar xzvf $REL_TAR)

MIX_ENV=prod mix ecto.create
MIX_ENV=prod mix ecto.migrate


crontab - <<CRONTAB
@reboot bash /home/spa/src/spa/start.sh
CRONTAB

#. start.sh
