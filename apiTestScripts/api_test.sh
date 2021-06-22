#!/bin/sh

rawurlencode() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""
  local pos c o

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02x' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}"    # You can either set a return variable (FASTER) 
  REPLY="${encoded}"   #+or echo the result (EASIER)... or both... :p
}



getAvailableStudentsJSON=$(jq -c . './getAvailableSlotsTest.json')

url="http://localhost:3500/available-slots/$(rawurlencode $getAvailableStudentsJSON)"
result=$(curl $url)

echo $result | jq . 

exit 0
