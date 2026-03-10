#!/bin/bash
cd /home/kavia/workspace/code-generation/game-price-comparison-hub-330667-330681/pricehunt_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
 if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

