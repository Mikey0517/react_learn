#!/bin/bash

veid='1156620';
api_key='private_Quglk2MKwmgnTdO5nUMbka0y';
ToLocation='USCA_8';
Timeout='550';

# START
[[ -n "$veid" ]] || exit 1
[[ -n "$api_key" ]] || exit 1
[[ -n "$ToLocation" ]] || exit 1
[[ -n "$Timeout" ]] || exit 1

CurrentLocation='';
Token="?veid=${veid}&api_key=${api_key}";
API_URL="https://api.64clouds.com/v1/";
while [[ "$CurrentLocation" != "$ToLocation" ]]; do
  CurrentLocation=$(wget --no-check-certificate -qO- "${API_URL}migrate/getLocations${Token}" |grep -o '"currentLocation":"[^"]*"' |cut -d'"' -f4)
  echo "$(date +"[%Y/%m/%d %H:%M:%S]") ${CurrentLocation}";
  if [ -n "$CurrentLocation" -a "$CurrentLocation" != "$ToLocation" ]; then
    echo -n "${ToLocation}: "
    wget --no-check-certificate -qO- "${API_URL}migrate/start${Token}&location=${ToLocation}" |grep -o '"message":"[^"]*"' |cut -d'"' -f4
  else
    break;
  fi
  sleep ${Timeout};
done

