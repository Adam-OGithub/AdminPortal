#!/bin/bash

update ()
{
steamcmd +login anonymous +force_install_dir ~/SatisfactoryDedicatedServer +app_update 1690800 validate +quit
}

killme()
{
process=$(ps -ef  | grep -v grep |grep Satis | cut -d ' ' -f 5) 
kill $process
echo "Killing $process"
}

startme()
{
#cd ./SatisfactoryDedicatedServer
#./FactoryServer.sh -unattended &
truncate -s 0 /share/factorylog/mainlog.log
../SatisfactoryDedicatedServer/FactoryServer.sh -log -unattended | tee /share/factorylog/mainlog.log &
}

backup()
{
cp -r ~/.config/Epic/FactoryGame/Saved/SaveGames/* ./factorybackup
}

checkme ()
{
ps -ef | grep -v grep| grep Satis
}

case $1 in
c ) clear;;
x ) exit;;
0 ) startme;;
1 ) killme;;
2 ) update;;
3 ) getlogs;;
* ) echo "invalid input";;
esac

