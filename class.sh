#!/bin/bash
for arg in "$@"
do
echo $arg
echo
ls $arg"/*"
ls "${arg}*/*/*/*/*/*/*/*"
done
