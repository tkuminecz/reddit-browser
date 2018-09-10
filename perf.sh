#!/usr/bin/env bash

TIME=10s

echo "GET http://app.localhost:3000/subreddit/reactjs" | vegeta attack -rate 200/1s -duration=${TIME} | tee results.bin | vegeta report
cat results.bin | vegeta report -type="hist[0,100ms,200ms,300ms,400ms,500ms,750ms,1000ms]"
cat results.bin | vegeta plot > perf.html && open -g perf.html
