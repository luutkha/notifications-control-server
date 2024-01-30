#!/bin/bash
domain=noti-control
token=df9f00b4-d864-4aa0-a953-24deb6ea0e46
ipv6addr=$(curl -s https://api6.ipify.org)
ipv4addr=$(curl -s https://api.ipify.org)
echo "https://www.duckdns.org/update?domains=$domain&token=$token&ip=$ipv4addr&ipv6=$ipv6addr"
curl -s "https://www.duckdns.org/update?domains=$domain&token=$token&ip=$ipv4addr&ipv6=$ipv6addr" -o ~/duckdns/duckdns.log