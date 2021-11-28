#!/bin/bash
cd ./SatisfactoryDedicatedServer
truncate -s 0 /share/factorylog/mainlog.log
./FactoryServer.sh -log -unattended | tee /share/factorylog/mainlog.log &
