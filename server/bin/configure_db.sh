#!/bin/bash

export PGPASSWORD='node_password'

echo "*--resetting db...--*"
dropdb -U node_user slimefarmdb
sleep 1
createdb -U node_user slimefarmdb
sleep 1
echo "*--creating tables...--*"
psql -U node_user slimefarmdb < ./bin/sql/account.sql
sleep 1
psql -U node_user slimefarmdb < ./bin/sql/generation.sql 
sleep 1
psql -U node_user slimefarmdb < ./bin/sql/slime.sql 
sleep 1
psql -U node_user slimefarmdb < ./bin/sql/trait.sql 
sleep 1
psql -U node_user slimefarmdb < ./bin/sql/slimeTrait.sql 
sleep 1
psql -U node_user slimefarmdb < ./bin/sql/accountSlime.sql 
sleep 1
echo "*--inserting data...--*"
node ./bin/insertTraits.js


echo "*--slimefarmdb was reconfigured--*"