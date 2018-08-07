#!/bin/sh

TEMSOCKET="/tmp/%L-%r@%h:%p"
SSHCREDENTIALS=" -i ~/.ssh/back.pem ubuntu@twilio-backend-hosting"

# initial connection 
ssh -M -f -N -o ControlPath=$TEMSOCKET $SSHCREDENTIALS

ssh -o ControlPath=$TEMSOCKET $SSHCREDENTIALS "sh deployBE.sh;"

# close the connection
ssh -S $TEMSOCKET -O exit $SSHCREDENTIALS
